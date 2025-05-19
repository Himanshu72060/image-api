const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');
const router = express.Router();
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// POST: Upload Image
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const image = new Image({
            name: req.body.name,
            imageUrl: req.file.path,
        });
        await image.save();
        res.status(201).json(image);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch all images
router.get('/', async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

// PUT: Update image metadata
router.put('/:id', async (req, res) => {
    try {
        const updated = await Image.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Remove image
router.delete('/:id', async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;