import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserModel extends Document {
  fullname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (
  this: IUserModel,
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
} as any;

userSchema.pre('save', async function (this: IUserModel, next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
