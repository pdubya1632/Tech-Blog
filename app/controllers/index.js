const { User } = require('../models');

module.exports = {
  // getAllProducts: async (req, res) => {
  //   try {
  //     const products = await Product.findAll();
  //     return res.status(200).json({ products });
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // getProductById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const product = await Product.findOne({
  //       where: { id: id },
  //     });
  //     if (product) {
  //       return res.status(200).json({ product });
  //     }
  //     return res
  //       .status(404)
  //       .send('Product with the specified ID does not exists');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  createUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: await bcrypt.hash(req.body.password, salt),
      };
      created_user = await User.create(user);
      return res.status(201).json({
        created_user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // updateProduct: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const [updated] = await Product.update(req.body, {
  //       where: { id: id },
  //     });
  //     if (updated) {
  //       const updatedProduct = await Product.findOne({
  //         where: { id: id },
  //       });
  //       return res.status(200).json({ product: updatedProduct });
  //     }
  //     throw new Error('Product not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // deleteProduct: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const deleted = await Product.destroy({
  //       where: { id: id },
  //     });
  //     if (deleted) {
  //       return res.status(204).send('Product deleted');
  //     }
  //     throw new Error('Product not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // getAllCategories: async (req, res) => {
  //   try {
  //     const categories = await Category.findAll();
  //     return res.status(200).json({ categories });
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // getCategoryById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findOne({
  //       where: { id: id },
  //     });
  //     if (category) {
  //       return res.status(200).json({ category });
  //     }
  //     return res
  //       .status(404)
  //       .send('Category with the specified ID does not exists');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // createCategory: async (req, res) => {
  //   try {
  //     const category = await Category.create(req.body);
  //     return res.status(201).json({
  //       category,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // },
  // updateCategory: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const [updated] = await Category.update(req.body, {
  //       where: { id: id },
  //     });
  //     if (updated) {
  //       const updatedCategory = await Category.findOne({
  //         where: { id: id },
  //       });
  //       return res.status(200).json({ category: updatedCategory });
  //     }
  //     throw new Error('Category not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // deleteCategory: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const deleted = await Category.destroy({
  //       where: { id: id },
  //     });
  //     if (deleted) {
  //       return res.status(204).send('Category deleted');
  //     }
  //     throw new Error('Category not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // getAllTags: async (req, res) => {
  //   try {
  //     const tags = await Tag.findAll();
  //     return res.status(200).json({ tags });
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // getTagById: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const tag = await Tag.findOne({
  //       where: { id: id },
  //     });
  //     if (tag) {
  //       return res.status(200).json({ tag });
  //     }
  //     return res
  //       .status(404)
  //       .send('Tag with the specified ID does not exists');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // createTag: async (req, res) => {
  //   try {
  //     const tag = await Tag.create(req.body);
  //     return res.status(201).json({
  //       tag,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }
  // },
  // updateTag: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const [updated] = await Tag.update(req.body, {
  //       where: { id: id },
  //     });
  //     if (updated) {
  //       const updatedTag = await Tag.findOne({
  //         where: { id: id },
  //       });
  //       return res.status(200).json({ tag: updatedTag });
  //     }
  //     throw new Error('Tag not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
  // deleteTag: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const deleted = await Tag.destroy({
  //       where: { id: id },
  //     });
  //     if (deleted) {
  //       return res.status(204).send('Tag deleted');
  //     }
  //     throw new Error('Tag not found');
  //   } catch (error) {
  //     return res.status(500).send(error.message);
  //   }
  // },
};
