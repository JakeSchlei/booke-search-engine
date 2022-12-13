const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in!')
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('User not found');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Password Incorrect!');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updateBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: args } },
                    { new: true }
                );

                return updateBook;
            }
            throw new AuthenticationError('You need to log in!')
        },
        removeBook: async (parent, args, context) => {
            if (context.user) {
                const deleteBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: args} },
                    { new: true }
                );

                return deleteBook;
            }
            throw new AuthenticationError('You need to log in!')
        }
    }
}

module.exports = resolvers;