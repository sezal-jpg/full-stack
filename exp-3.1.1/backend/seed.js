// run with: npm run seed
// creates one admin and one regular user for testing all three experiments
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // clear existing users before seeding
  await User.deleteMany({});

  await User.insertMany([
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user', password: 'user123', role: 'user' },
  ]);

  // passwords are hashed automatically by the pre-save hook in User.js
  // but insertMany skips hooks, so we create individually
  await User.deleteMany({});
  const admin = new User({ username: 'admin', password: 'admin123', role: 'admin' });
  const user = new User({ username: 'user', password: 'user123', role: 'user' });
  await admin.save();
  await user.save();

  console.log('Seeded users:');
  console.log('  admin / admin123  (role: admin)');
  console.log('  user  / user123   (role: user)');
  await mongoose.disconnect();
};

seed().catch(console.error);
