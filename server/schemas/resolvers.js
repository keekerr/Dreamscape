const { User, VisionBoard, Diary } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const { request, gql } = require('graphql-request');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).select("-__v -password");
            }
            throw new AuthenticationError("You must be logged in to use this feature.")
        },
        // photos: async () => {
        //     const query = gql`
        //       query {
        //         photos {
        //           id
        //           urls {
        //             regular
        //           }
        //         }
        //       }
        //     `;

        //     const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
        //     const headers = {
        //         Authorization: `Client-ID ${unsplashAccessKey}`,
        //     };

        //     try {
        //         const data = await request('https://api.unsplash.com/graphql', query, { headers });
        //         return data.photos;
        //     } catch (error) {
        //         console.error(error);
        //         throw new Error('Failed to fetch photos from Unsplash API');
        //     }
        // },
    },
    Mutation: {
        loginUser: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials.")
            };

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials.")
            }

            const token = signToken(user);
            return { token, user };
        },
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        addEntry: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { diaryEntries: input } },
                    { new: true }
                )

                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to use this feature.")
        },
        editEntry: async (parent, { input }, context) => {
            if (context.user) {
                const updatedEntry = await Diary.findOneAndUpdate(
                    { entryID: input.entryID },
                    { $push: { input } },
                )

                return updatedEntry
            }
            throw new AuthenticationError("You must be logged in to use this feature.")
        },
        removeEntry: async (parent, { entryID }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { diaryEntries: { entryID } } },
                { new: true }
              );
              return updatedUser;
            }
            throw new AuthenticationError("You must be logged in to use this feature.");
          },
        addImage: async (parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { images: input } },
                    { new: true }
                )

                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to use this feature.")
        },
        removeImage: async (parent, { imageID }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { images: { imageID } } },
                    { new: true }
                )
                return updatedUser
            }
            throw new AuthenticationError("You must be logged in to use this feature.")
        }
    }
};

module.exports = resolvers;