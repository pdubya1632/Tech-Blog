const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) =>
  res.send('You, dear user, have reached the root.')
);

router.get('/products', controllers.getAllProducts);
router.get('/products/:id', controllers.getProductById);
router.post('/products', controllers.createProduct);
router.put('/products/:id', controllers.updateProduct);
router.delete('/products/:id', controllers.deleteProduct);

router.get('/categories', controllers.getAllCategories);
router.get('/categories/:id', controllers.getCategoryById);
router.post('/categories', controllers.createCategory);
router.put('/categories/:id', controllers.updateCategory);
router.delete('/categories/:id', controllers.deleteCategory);

router.get('/tags', controllers.getAllTags);
router.get('/tags/:id', controllers.getTagById);
router.post('/tags', controllers.createTag);
router.put('/tags/:id', controllers.updateTag);
router.delete('/tags/:id', controllers.deleteTag);

module.exports = router;
