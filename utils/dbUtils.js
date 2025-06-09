const db = require('../models');

/**
 * Execute a database operation with transaction and retry logic
 * @param {Function} operation - The database operation to execute
 * @param {Object} options - Options for the transaction
 * @returns {Promise} - Result of the operation
 */
async function withTransaction(operation, options = {}) {
  const maxRetries = options.maxRetries || 3;
  const initialBackoff = options.initialBackoff || 1000; // 1 second
  let lastError = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const transaction = await db.sequelize.transaction({
      isolationLevel: options.isolationLevel || 'READ COMMITTED',
      // Increased timeout for transactions
      timeout: options.timeout || 30000 // 30 seconds
    }).catch(err => {
      console.error(`Transaction creation failed (attempt ${attempt + 1}/${maxRetries}):`, err);
      throw err;
    });
    
    try {
      const result = await operation(transaction);
      await transaction.commit();
      return result;
    } catch (error) {
      await transaction.rollback();
      lastError = error;
      
      // Check if error is retryable (connection errors usually are)
      const isRetryable = 
        error.name === 'SequelizeConnectionError' || 
        error.name === 'SequelizeConnectionRefusedError' ||
        error.name === 'SequelizeConnectionAcquireTimeoutError' ||
        error.name === 'SequelizeConnectionTimedOutError';
      
      if (!isRetryable || attempt >= maxRetries - 1) {
        throw error;
      }
      
      // Exponential backoff with jitter
      const backoff = initialBackoff * Math.pow(2, attempt) * (0.5 + Math.random() * 0.5);
      console.log(`Retrying transaction in ${backoff}ms (attempt ${attempt + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, backoff));
    }
  }
  
  throw lastError;
}

module.exports = {
  withTransaction
}; 