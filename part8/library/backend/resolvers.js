const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author');

      if (!args.author && !args.genre) {
        return books;
      } else if (!args.author && args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      } else if (args.author && !args.genre) {
        return books.filter((book) => book.author.name === args.author);
      }
      return books.filter(
        (book) => book.author.name === args.author && book.genres.includes(args.genre)
      );
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const books = await Book.find({}).populate('author');
      const author = args.author;

      let bookAuthor = null;
      if (!books.find((book) => book.author.name === author)) {
        const newAuthor = new Author({
          name: author,
          born: null,
        });
        try {
          bookAuthor = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError('Saving person failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      } else {
        bookAuthor = await Author.findOne({ name: author });
      }

      const newBook = new Book({
        title: args.title,
        published: args.published,
        author: bookAuthor,
        genres: args.genres,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError('Saving person failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      return Author.findByIdAndUpdate(author._id, { born: args.setBornTo }, { new: true });
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre });

      return user.save().catch((error) => {
        console.log(error);
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root, args) => {
      const books = await Book.find({}).populate('author');
      return books.filter((book) => book.author.name === root.name).length;
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
