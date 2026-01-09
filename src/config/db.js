const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dwfs-crud';
        const connection = await mongoose.connect(uri);
        console.log(`Connected to MongoDB successfully (${uri})`);
        return connection;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;












    







