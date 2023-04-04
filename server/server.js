const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { request, gql } = require('graphql-request');
require('dotenv').config();
// const Unsplash = require('unsplash-js').default;
// const fetch = require('node-fetch');
// const fs = require('fs');

// const unsplash = new Unsplash({
//   accessKey: process.env.UNSPLASH_ACCESS_KEY,
//   fetch,
// });

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// app.get('/api/unsplash', async (req, res) => {
//   try {
//     const { query } = req.query;

//     // Search for photos based on user input
//     const result = await unsplash.search.photos({
//       query: query,
//       perPage: 5,
//       orientation: 'landscape',
//     });

//     // Retrieve the search results and display them to the user
//     const photos = result.response.results;

//     // Download each photo to the server's file system
//     const downloads = photos.map(async (photo) => {
//       const response = await fetch(photo.urls.regular);
//       const buffer = await response.buffer();
//       const filename = `${photo.id}.jpg`;
//       const path = `./images/${filename}`;
//       await fs.promises.writeFile(path, buffer);
//       return {
//         id: photo.id,
//         urls: {
//           regular: `http://localhost:${PORT}/images/${filename}`,
//         },
//       };
//     });

//     const downloadedPhotos = await Promise.all(downloads);

//     res.json(downloadedPhotos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to fetch photos from Unsplash API');
//   }
// });

// app.post('/api/unsplash/download', async (req, res) => {
//   try {
//     const { downloadLocation } = req.body;

//     const response = await fetch(downloadLocation);
//     const buffer = await response.buffer();
//     const filename = `${Date.now()}.jpg`;
//     const path = `./downloads/${filename}`;
//     await fs.promises.writeFile(path, buffer);

//     res.json({
//       message: 'Photo downloaded successfully',
//       downloadUrl: `http://localhost:${PORT}/downloads/${filename}`,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Failed to download photo from Unsplash API');
//   }
// });

// Serve up static assets
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/images', express.static(path.join(__dirname, './images')));
app.use('/downloads', express.static(path.join(__dirname, './downloads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Serve the client's HTML file for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the server
startApolloServer(typeDefs, resolvers);
