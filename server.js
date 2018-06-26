const express = require('express');
const morgan = require('morgan');
const blogPostRouter = require('./blogPostRouter');
const app = express();


// log the http layer
app.use(morgan('common'));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html');
// });


// when requests come into `/shopping-list` or
// `/recipes`, we'll route them to the express
// router instances we've imported. Remember,
// these router instances act as modular, mini-express apps.
app.use('/blog-posts', blogPostRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 3000}`);
});
