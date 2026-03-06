import CategoryRepository from '../repositories/CategoryRepository.js';

// Service layer that contains business logic for Category
export default class CategoryService {

    // Create a new category
    static async createCategory(data) {
        const { parentId, ...rest } = data;

        // Create category using repository
        const category = await CategoryRepository.create(rest);

        // If parentId is provided, add this category as a subcategory
        if (parentId) {
            const parent = await CategoryRepository.findById(parentId);

            // If parent category does not exist throw error
            if (!parent) {
                throw new Error('Parent category not found');
            }

            // Add new category id to parent's subcategories list
            parent.subcategories.push(category._id);
            await parent.save();
        }

        return category;
    }

    // Get category by ID
    static async getCategory(id) {
        return CategoryRepository.findById(id);
    }

    // Update category details
    static async updateCategory(id, data) {
        return CategoryRepository.update(id, data);
    }

    // Delete category
    static async deleteCategory(id) {

        // Find categories where this category is used as a subcategory
        const categories = await CategoryRepository.list({ subcategories: id });

        // Remove this category from parent's subcategories list
        for (const parent of categories) {
            parent.subcategories = parent.subcategories.filter(
                sub => sub.toString() !== id.toString()
            );
            await parent.save();
        }

        // Finally delete the category
        return CategoryRepository.delete(id);
    }

    // Get list of categories with optional filter
    static async listCategories(filter) {
        return CategoryRepository.list(filter);
    }
}