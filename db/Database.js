const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`mongodb connected with server: ${connection.connection.host}`);
  } catch (error) {
    console.log('Error connecting to database:', error.message);
  }
};

module.exports = connectDatabase;
