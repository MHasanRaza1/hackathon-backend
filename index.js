import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './database/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Backend');
});

app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running`);
});