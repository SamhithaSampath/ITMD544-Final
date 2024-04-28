const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new author
router.post('/authors', async (req, res) => {
    const { name } = req.body;
    try {
        const newAuthor = await prisma.author.create({
            data: {
                name
            }
        });
        res.json(newAuthor);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all authors
router.get('/authors', async (req, res) => {
    try {
        const authors = await prisma.author.findMany();
        res.json(authors);
    } catch (error) {
        console.error('Error fetching authors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get author by ID
router.get('/authors/:id', async (req, res) => {
    const authorId = parseInt(req.params.id);
    try {
        const author = await prisma.author.findUnique({
            where: { id: authorId },
        });
        if (!author) {
            res.status(404).json({ error: 'Author not found' });
        } else {
            res.json(author);
        }
    } catch (error) {
        console.error('Error fetching author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update author
router.put('/authors/:id', async (req, res) => {
    const authorId = parseInt(req.params.id);
    const { name } = req.body;
    try {
        const updatedAuthor = await prisma.author.update({
            where: { id: authorId },
            data: {
                name
            }
        });
        res.json(updatedAuthor);
    } catch (error) {
        console.error('Error updating author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete author
router.delete('/authors/:id', async (req, res) => {
    const authorId = parseInt(req.params.id);
    try {
        await prisma.author.delete({
            where: { id: authorId },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting author:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
