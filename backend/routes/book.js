const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new book
router.post('/books', async (req, res) => {
    const { title, authorId, topicId } = req.body;

    // Validate that authorId and topicId are valid integers
    if (isNaN(authorId) || isNaN(topicId)) {
        return res.status(400).json({ error: 'AuthorId and topicId must be valid integers' });
    }

    try {
        // Check if authorId and topicId exist in the database before creating the book
        const existingAuthor = await prisma.author.findUnique({ where: { id: parseInt(authorId) } });
        const existingTopic = await prisma.topic.findUnique({ where: { id: parseInt(topicId) } });

        if (!existingAuthor) {
            return res.status(404).json({ error: 'Author not found' });
        }

        if (!existingTopic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        // Create the book if authorId and topicId are valid
        const newBook = await prisma.book.create({
            data: {
                title,
                authorId: parseInt(authorId),
                topicId: parseInt(topicId)
            }
        });

        res.json(newBook);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Get all books
router.get('/books', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.json(books);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get book by ID
router.get('/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await prisma.book.findUnique({
            where: { id: bookId },
        });
        if (!book) {
            res.status(404).json({ error: 'Book not found' });
        } else {
            res.json(book);
        }
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update book
router.put('/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    const { title, authorId, topicId } = req.body;
    try {
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: {
                title,
                authorId,
                topicId
            }
        });
        res.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete book
router.delete('/books/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        await prisma.book.delete({
            where: { id: bookId },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
