require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const mailRoutes = require('./routes/mailRoutes');

const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mail', mailRoutes);

app.get('/api/health', (req, res) => {
    res.send('MELO server is running!');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`MELO server running on port ${PORT}`);
    });
};

startServer();