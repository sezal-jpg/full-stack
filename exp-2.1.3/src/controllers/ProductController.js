import ProductService from '../services/ProductService.js';

// Controller class to handle product related HTTP requests
export default class ProductController {

  // Create a new product
  static async create(req, res) {
    try {
      // Call service layer to create product using request body data
      const product = await ProductService.createProduct(req.body);

      // Send created product as response
      res.status(201).json(product);
    } catch (err) {
      // If any error occurs return bad request
      res.status(400).json({ error: err.message });
    }
  }

  // Get a product using its ID
  static async get(req, res) {
    try {
      // Fetch product from service layer
      const product = await ProductService.getProduct(req.params.id);

      // If product not found return 404
      if (!product) return res.status(404).send('Not found');

      // Send product data as response
      res.json(product);
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }

  // Update product details
  static async update(req, res) {
    try {
      // Update product using id and new data
      const updated = await ProductService.updateProduct(req.params.id, req.body);

      // Send updated product as response
      res.json(updated);
    } catch (err) {
      // Handle update error
      res.status(400).json({ error: err.message });
    }
  }

  // Delete a product by ID
  static async delete(req, res) {
    try {
      // Call service to delete the product
      await ProductService.deleteProduct(req.params.id);

      // Send success response after deletion
      res.status(204).send();
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }

  // Get list of all products
  static async list(req, res) {
    try {
      // Fetch products with optional query filters
      const products = await ProductService.listProducts(req.query);

      // Send list of products
      res.json(products);
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }
}