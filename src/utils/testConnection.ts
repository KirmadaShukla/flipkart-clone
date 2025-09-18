import mongoose from 'mongoose';

const testConnection = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/flipkart_clone');
    console.log('MongoDB connection successful');
    
    // Test creating a user
    const User = (await import('../models/mongoose/User')).default;
    
    const user = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      role: 'customer'
    });
    
    await user.save();
    console.log('User created successfully');
    
    // Clean up
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test user cleaned up');
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
};

testConnection();