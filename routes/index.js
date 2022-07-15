const router = require('express').Router();
const controllers = require('../controllers');

// const marked = require('marked');
// const domPurify = require('dompurify');
// const { JSDOM } = require('jsdom');
// const purify = domPurify(new JSDOM().window);

// router.get('/', async (req, res) => {
// const results = await db.query("select * from posts");
// res.send({ rows: results.rows });
// res.render('home');
// });

// router.get('/blog/:id', controllers.getPostBySlug);
// router.put('/blog/edit/:id', controllers.updatePost);
// router.delete('/blog/:id', controllers.deletePost);

// router.post('/blog/new', controllers.createPost);

// router.post('/login', controllers.createUser);

// router.get('/categories/:id', controllers.getCategoryById);
// router.post('/categories', controllers.createCategory);
// router.put('/categories/:id', controllers.updateCategory);
// router.delete('/categories/:id', controllers.deleteCategory);

module.exports = router;
