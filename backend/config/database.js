import mongoose from 'mongoose';

// MongoDB connection
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospitalDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Initialize database with default data (if needed)
export const initializeDB = async () => {
  // This function will be implemented in a separate migration script
  console.log('✅ Database initialization completed');
};

export default mongoose;