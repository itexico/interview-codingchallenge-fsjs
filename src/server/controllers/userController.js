import express from 'express';
import User from "../models/usersModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uuid from 'react-uuid';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_KEY } = process.env;
const router = express.Router();

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            console.log("No user was found with this email.");
            return res.status(404).json({ message: "No user was found with this email." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);//Comparing password

        if (!isPasswordCorrect) {
            console.log("Invalid Credfentials.");
            return res.status(404).json({ message: "Invalid Credfentials." });
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, JWT_KEY, { expiresIn: "2h" });

        console.log("User result: ", existingUser, " User token: ", token);
        return res.status(200).json({ result: existingUser, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong",
            error,
        })
    }


};

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            console.log("User already exist.");
            return res.status(400).json({ message: "User already exist." });
        }

        if (password !== confirmPassword) {
            console.log("Passwords do not match.");
            return res.status(400).json({ message: "Passwords do not match." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);//Hashing the password
        const result = await User.create({ email, password: hashedPassword, name, _id: uuid(), });// Create User

        const token = jwt.sign({ email: result.email, id: result._id }, JWT_KEY, { expiresIn: "2h" });

        console.log("User result. ", result, " User token. ", token);
        return res.status(200).json({ result, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Something went wrong",
            error,
        })
    }
};

export default router;