const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination'); 

// 1. GET: Fetch all destinations
router.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
});

// 2. POST: Add a new destination
router.post('/', async (req, res) => {
  try {
    const { name, state, photo } = req.body;
    if (!name || !state) {
      return res.status(400).json({ message: "Name and state are required." });
    }
    const newDestination = await Destination.create({ name, state, photo });
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ message: "Failed to add", error: error.message });
  }
});

// 3. DELETE: Remove a destination
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found." });
    res.json({ message: "Destination successfully removed." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error: error.message });
  }
});

module.exports = router;