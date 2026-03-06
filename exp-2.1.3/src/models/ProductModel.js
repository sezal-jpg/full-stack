import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Creating schema for Product collection
const ProductSchema = new Schema({

  // Name of the product (required)
  name: { type: String, required: true },

  // Description of the product
  description: { type: String },

  // Price of the product (required field)
  price: { type: Number, required: true },

  // SKU (Stock Keeping Unit) used to uniquely identify the product
  sku: { type: String, unique: true },
});

// Exporting the Product model so it can be used in other parts of the application
export default model('Product', ProductSchema);