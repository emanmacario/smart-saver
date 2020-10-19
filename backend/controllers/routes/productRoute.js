// const axios = require('axios').default;
const router = require('express').Router();
const isAuth = require('../middlewares/authMiddleware');
const UserService = require('../../services/userService');

const UserServiceInstance = new UserService();


/**
 * Endpoint for adding a product to a specific user's product list 
 */
router.route('/products').post(isAuth, async (req, res) => {
  // Validate the URL
  const url = req.body.url;
  const userId = req.user._id;

  const { success, message } = await UserServiceInstance.addProduct(url, userId);
  let code = success ? 200 : 400;
  res.status(code).json({ success: success, message: message });
});


/**
 * Endpoint for retrieving paginated and filtered products for a specific user
 */
router.route('/products').get(isAuth, async (req, res) => {
  const userId = req.user._id;
  const { success, message, products } = await UserServiceInstance.getProducts(req.query, userId);
  let code = success ? 200 : 400;
  res.status(code).json({ success: success, message: message, products: products });
});


/**
 * Endpoint for deleting a product from a specific user's product list
 */
router.route('/products/:number').delete(isAuth, async (req, res) => {
  const { number } = req.params;
  const userId = req.user._id;

  const { success, message } = await UserServiceInstance.deleteProduct(userId, number);
  let code = success ? 200 : 500;
  res.status(code).json({ success: success, message: message });
});


module.exports = router;