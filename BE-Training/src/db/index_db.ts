import mongoose from 'mongoose';

const url = 'mongodb://localhost:27017/';
const dbName = 'mydatabase';


export const connectDB = async () => {
  try {
    await mongoose.connect(url+dbName);
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};
