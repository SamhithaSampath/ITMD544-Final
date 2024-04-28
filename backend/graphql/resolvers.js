const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    books: async () => {
      return await prisma.book.findMany();
    },
    book: async (_, { id }) => {
      return await prisma.book.findUnique({
        where: { id: parseInt(id) },
      });
    },
    authors: async () => {
      return await prisma.author.findMany();
    },
    author: async (_, { id }) => {
      return await prisma.author.findUnique({
        where: { id: parseInt(id) },
      });
    },
    topics: async () => {
      return await prisma.topic.findMany();
    },
    topic: async (_, { id }) => {
      return await prisma.topic.findUnique({
        where: { id: parseInt(id) },
      });
    },
  },
  Mutation: {
    createBook: async (_, { title, authorId, topicId }) => {
        // Check if the author with the provided ID exists in the database
        const existingAuthor = await prisma.author.findUnique({
          where: { id: parseInt(authorId) },
        });
      
        // If the author does not exist, throw an error
        if (!existingAuthor) {
          throw new Error('Author not found');
        }
      
        // If the author exists, proceed with creating the book
        return await prisma.book.create({
          data: {
            title,
            author: { connect: { id: parseInt(authorId) } },
            topic: { connect: { id: parseInt(topicId) } },
          },
        });
      },
      
    updateBook: async (_, { id, title, authorId, topicId }) => {
      return await prisma.book.update({
        where: { id: parseInt(id) },
        data: {
          title,
          author: { connect: { id: parseInt(authorId) } },
          topic: { connect: { id: parseInt(topicId) } },
        },
      });
    },
    deleteBook: async (_, { id }) => {
      await prisma.book.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
    createAuthor: async (_, { name }) => {
      return await prisma.author.create({
        data: { name }
      });
    },
    updateAuthor: async (_, { id, name }) => {
      return await prisma.author.update({
        where: { id: parseInt(id) },
        data: { name }
      });
    },
    deleteAuthor: async (_, { id }) => {
      await prisma.author.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
    createTopic: async (_, { name }) => {
      return await prisma.topic.create({
        data: { name }
      });
    },
    updateTopic: async (_, { id, name }) => {
      return await prisma.topic.update({
        where: { id: parseInt(id) },
        data: { name }
      });
    },
    deleteTopic: async (_, { id }) => {
      await prisma.topic.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
  },
  Book: {
    author: async (parent) => {
      return await prisma.author.findUnique({
        where: { id: parent.authorId },
      });
    },
    topic: async (parent) => {
      return await prisma.topic.findUnique({
        where: { id: parent.topicId },
      });
    },
  },
  Author: {
    books: async (parent) => {
      return await prisma.book.findMany({
        where: { authorId: parent.id }
      });
    },
  },
  Topic: {
    books: async (parent) => {
      // Assuming parent.books is an array of books associated with the topic
      return await prisma.book.findMany({
        where: { topicId: parent.id }
      });
    }
  }
};

module.exports = resolvers;
