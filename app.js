require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const imageRoutes = require('./routes/imageRoutes');
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/images', imageRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(err => console.error(err));