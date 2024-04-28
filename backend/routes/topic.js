const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new topic
router.post('/topics', async (req, res) => {
    const { name } = req.body;
    try {
        const newTopic = await prisma.topic.create({
            data: {
                name
            }
        });
        res.json(newTopic);
    } catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all topics
router.get('/topics', async (req, res) => {
    try {
        const topics = await prisma.topic.findMany();
        res.json(topics);
    } catch (error) {
        console.error('Error fetching topics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get topic by ID
router.get('/topics/:id', async (req, res) => {
    const topicId = parseInt(req.params.id);
    try {
        const topic = await prisma.topic.findUnique({
            where: { id: topicId },
        });
        if (!topic) {
            res.status(404).json({ error: 'Topic not found' });
        } else {
            res.json(topic);
        }
    } catch (error) {
        console.error('Error fetching topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update topic
router.put('/topics/:id', async (req, res) => {
    const topicId = parseInt(req.params.id);
    const { name } = req.body;
    try {
        const updatedTopic = await prisma.topic.update({
            where: { id: topicId },
            data: {
                name
            }
        });
        res.json(updatedTopic);
    } catch (error) {
        console.error('Error updating topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete topic
router.delete('/topics/:id', async (req, res) => {
    const topicId = parseInt(req.params.id);
    try {
        await prisma.topic.delete({
            where: { id: topicId },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
