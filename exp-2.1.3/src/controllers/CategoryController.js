import CategoryService from '../services/CategoryService.js';

// Controller class to handle HTTP requests related to Category
export default class CategoryController {

  // Create a new category
  static async create(req, res) {
    try {
      // Call service layer to create category using request body
      const category = await CategoryService.createCategory(req.body);

      // Send created category as response
      res.status(201).json(category);
    } catch (err) {
      // If error occurs return bad request
      res.status(400).json({ error: err.message });
    }
  }

  // Get a category by its ID
  static async get(req, res) {
    try {
      // Fetch category from service using id parameter
      const category = await CategoryService.getCategory(req.params.id);

      // If category not found return 404
      if (!category) return res.status(404).send('Not found');

      // Send category data
      res.json(category);
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }

  // Update category details
  static async update(req, res) {
    try {
      // Update category using id and new data
      const updated = await CategoryService.updateCategory(req.params.id, req.body);

      // Send updated category
      res.json(updated);
    } catch (err) {
      // Handle validation or update error
      res.status(400).json({ error: err.message });
    }
  }

  // Delete category by ID
  static async delete(req, res) {
    try {
      // Call service to delete category
      await CategoryService.deleteCategory(req.params.id);

      // Send no content response after deletion
      res.status(204).send();
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }

  // Get list of all categories
  static async list(req, res) {
    try {
      // Fetch categories with optional query filters
      const categories = await CategoryService.listCategories(req.query);

      // Send list as response
      res.json(categories);
    } catch (err) {
      // Handle server error
      res.status(500).json({ error: err.message });
    }
  }
}