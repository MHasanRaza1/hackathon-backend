import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send({ status: 200, message: 'users fetched successfully', data: users });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
};

export const registerUser = async (req, res) => {
    const { username, name, email, password } = req.body;
    try {
        if (!username || !name || !email || !password) {
            return res.status(400).send({ status: 400, message: 'All fields are required' });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).send({ status: 400, message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, name, email, password: hashedPassword });
        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        res.status(201).send({ status: 201, message: 'user registered successfully', data: user, token });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ status: 400, message: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ status: 400, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ status: 400, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWTSECRET);
        res.status(200).send({ status: 200, message: 'user logged in successfully', data: user, token });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.status(200).send({ status: 200, message: 'user logged out successfully' });
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}