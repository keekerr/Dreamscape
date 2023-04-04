const Unsplash = require('unsplash-js');

const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

module.exports = unsplash;
