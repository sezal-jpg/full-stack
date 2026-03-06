import ProductRepository from '../repositories/ProductRepository.js';

// Service layer that contains business logic for Product
export default class ProductService {

  // Create a new product
  static async createProduct(data) {
    // Call repository to save product in database
    return ProductRepository.create(data);
  }

  // Get product details using ID
  static async getProduct(id) {
    // Fetch product from repository
    return ProductRepository.findById(id);
  }

  // Update product information
  static async updateProduct(id, data) {
    // Update product in database
    return ProductRepository.update(id, data);
  }

  // Delete product by ID
  static async deleteProduct(id) {
    // Remove product from database
    return ProductRepository.delete(id);
  }

  // Get list of products
  static async listProducts(filter) {
    // Fetch products with optional filters
    return ProductRepository.list(filter);
  }
}