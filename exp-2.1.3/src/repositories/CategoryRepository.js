import Category from '../models/CategoryModel.js';

// Repository class responsible for database operations related to Category
export default class CategoryRepository {

    // Create a new category in the database
    static async create(data) {
        const category = new Category(data);
        return category.save(); // Save category document to MongoDB
    }

    // Find a category by its ID
    static async findById(id) {
        return Category.findById(id)
            .populate('subcategories') // Fetch related subcategories
            .populate('products') // Fetch related products
            .exec();
    }

    // Update category details by ID
    static async update(id, data) {
        return Category.findByIdAndUpdate(id, data, { new: true }).exec(); 
        // { new: true } returns the updated document
    }

    // Delete a category by ID
    static async delete(id) {
        return Category.findByIdAndDelete(id).exec();
    }

    // Get list of categories with optional filter
    static async list(filter = {}) {
        return Category.find(filter)
            .populate('subcategories') // Include subcategory data
            .populate('products') // Include product data
            .exec();
    }
}