import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    userEmail: String,
    userPassword: String
});

const user = mongoose.model('user', userSchema);

export default user;