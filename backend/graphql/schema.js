// schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: Author
    topic: Topic
  }

  type Author {
    id: ID!
    name: String!
    books: [Book]!
  }

  type Topic {
    id: ID!
    name: String!
    books: [Book]!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    authors: [Author!]!
    author(id: ID!): Author
    topics: [Topic!]!
    topic(id: ID!): Topic
  }

  type Mutation {
    createBook(title: String!, authorId: Int!, topicId: Int!): Book!
    updateBook(id: ID!, title: String, authorId: Int, topicId: Int): Book!
    deleteBook(id: ID!): Boolean!
    createAuthor(name: String!): Author!
    updateAuthor(id: ID!, name: String!): Author!
    deleteAuthor(id: ID!): Boolean!
    createTopic(name: String!): Topic!
    updateTopic(id: ID!, name: String!): Topic!
    deleteTopic(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;