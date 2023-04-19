const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/items', require('./routes/itemRoutes'))
app.use('/api/v1/users', require('./routes/userRoutes'));

// serve the frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set environment to production'))
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`.rainbow));