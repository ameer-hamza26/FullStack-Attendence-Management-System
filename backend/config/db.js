import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('MongoDB URI not provided, skipping database connection');
      return;
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected Successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Don't exit process, just log the error
    console.log('Continuing without database connection...');
  }
};

export default connectDB; 