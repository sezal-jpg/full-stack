import Product from '../models/ProductModel.js';

// Repository class that handles database operations for Product
export default class ProductRepository {

  // Create and save a new product in the database
  static async create(data) {
    const product = new Product(data);
    return product.save(); // Save product document to MongoDB
  }

  // Find a product using its ID
  static async findById(id) {
    return Product.findById(id).exec();
  }

  // Update product details by ID
  static async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true }).exec();
    // { new: true } returns the updated document
  }

  // Delete a product by ID
  static async delete(id) {
    return Product.findByIdAndDelete(id).exec();
  }

  // Get list of products with optional filters
  static async list(filter = {}) {
    return Product.find(filter).exec();
  }
}