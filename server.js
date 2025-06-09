require('dotenv').config();
const app = require("./app");
const db = require("./models");
const PORT = process.env.PORT || 5001;

// Test database connection
async function testDatabaseConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

// Start server only after validating database connection
async function startServer() {
  const isDbConnected = await testDatabaseConnection();
  
  if (isDbConnected) {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on PORT: ${PORT}`);
    });
    
    // Handle server shutdown gracefully to close database connections
    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        // Close database connections
        db.sequelize.close().then(() => {
          console.log('Database connections closed');
          process.exit(0);
        });
      });
    });
  } else {
    console.error('Server not started due to database connection issues');
    process.exit(1);
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

// Start the server
startServer();
