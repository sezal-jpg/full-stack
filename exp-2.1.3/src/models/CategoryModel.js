import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Creating schema for Category collection
const CategorySchema = new Schema({
    
    // Name of the category (required field)
    name: { type: String, required: true },

    // Short description of the category
    description: { type: String },

    // List of subcategories related to this category
    subcategories: [
        {
            type: Schema.Types.ObjectId, // Reference ID
            ref: 'Category', // Refers to Category collection
        },
    ],

    // List of products that belong to this category
    products: [
        {
            type: Schema.Types.ObjectId, // Reference ID
            ref: 'Product', // Refers to Product collection
        },
    ],
});

// Exporting the model so it can be used in other files
export default model('Category', CategorySchema);