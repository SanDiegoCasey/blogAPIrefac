const express = require('express');
const router = express.Router();

// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();


const {BlogPosts} = require('./models');

// we're going to add some recipes to Recipes
// so there's some data to look at
BlogPosts.create(
  'making rice', 'Add the following; 1 cup white rice, 2 cups water, pinch of salt', 'Casey Whitcher');
BlogPosts.create(
'making soup', 'Add these; 2 cups water and small children', 'Casey Whitcher');

// send back JSON representation of all recipes
// on GET requests to root
router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});


// when new recipe added, ensure has required fields. if not,
// log error and return 400 status code with hepful message.
// if okay, add new item, and return it with a status 201.
router.post('/', (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title','content','author'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
  res.status(201).json(item);
});
// when PUT request comes in with updated recipe, ensure has
// required fields. also ensure that recipe id in url path, and
// recipe id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `Recipes.updateItem` with updated recipe.
router.put('/:id', (req, res) => {
  const requiredFields = ['id','title', 'content', 'author','publishDate'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog list item \`${req.params.id}\``);
  BlogPosts.update({
    id: req.params.id,
    title: req.params.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
})

// Delete recipes (by id)!
router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted shopping list item \`${req.params.ID}\``);
  res.status(204).end();
});

module.exports = router;
