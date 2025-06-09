module.exports = (err, req, res, next) => {
  // Log the error (without exposing sensitive info in production)
  if (process.env.NODE_ENV !== 'production') {
    console.error("Error Middleware:", err);
  } else {
    console.error("Error:", err.name, err.message);
  }

  // Handling Sequelize database connection errors
  if (err.name && (
    err.name === 'SequelizeConnectionError' || 
    err.name === 'SequelizeConnectionRefusedError' ||
    err.name === 'SequelizeConnectionAcquireTimeoutError' ||
    err.name === 'SequelizeConnectionTimedOutError'
  )) {
    return res.status(503).json({
      success: false,
      message: "Database service temporarily unavailable. Please try again later.",
    });
  }

  // Handling custom error with isConnectionError flag
  if (err.isConnectionError) {
    return res.status(503).json({
      success: false,
      message: err.userMessage || "Service temporarily unavailable. Please try again later.",
    });
  }

  // Authentication errors
  if (err?.status === 401) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  // Default error handler
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    data: process.env.NODE_ENV !== 'production' ? {
      status: err?.status,
      message: err?.message,
      name: err?.name,
      // Only include stack trace in non-production environments
      stack: process.env.NODE_ENV !== 'production' ? err?.stack : undefined,
    } : undefined,
  });
};
