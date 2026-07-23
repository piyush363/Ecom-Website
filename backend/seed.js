const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@shopnest.com",
      password: hashedPassword,
      role: "admin",
    });

    const products = [
      {
        name: "Wireless Noise-Cancelling Headphones",
        description:
          "Immersive sound experience with advanced active noise cancellation and 30-hour battery life.",
        price: 299.99,
        category: "Electronics",
        stock: 15,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.8,
        numReviews: 24,
      },
      {
        name: "Minimalist Modern Chair",
        description:
          "A stylish and comfortable addition to any contemporary living room or study setup.",
        price: 150.0,
        category: "Furniture",
        stock: 30,
        imageUrl:
          "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.2,
        numReviews: 12,
      },
      {
        name: "Professional DSLR Camera",
        description:
          "Capture stunning moments with high-resolution clarity, 4K video capabilities, and fast autofocus.",
        price: 1199.99,
        category: "Electronics",
        stock: 8,
        imageUrl:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.9,
        numReviews: 50,
      },
      {
        name: "Classic Urban Red Sneakers",
        description:
          "Versatile and lightweight, designed for all-day comfort and street-style aesthetic.",
        price: 85.0,
        category: "Footwear",
        stock: 50,
        imageUrl:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.5,
        numReviews: 89,
      },
      {
        name: "Amoled Smartwatch Series X",
        description:
          "Track your heart rate, sleep, workouts, and stay connected with seamless smart notifications.",
        price: 199.5,
        category: "Electronics",
        stock: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.7,
        numReviews: 64,
      },
      {
        name: "Mechanical RGB Gaming Keyboard",
        description:
          "Tactile mechanical switches with customizable RGB backlighting for extreme gaming precision.",
        price: 129.99,
        category: "Electronics",
        stock: 20,
        imageUrl:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.6,
        numReviews: 38,
      },
      {
        name: "Luxury Chronograph Leather Watch",
        description:
          "Timeless elegance with a genuine leather strap and premium stainless steel dial finish.",
        price: 249.0,
        category: "Accessories",
        stock: 12,
        imageUrl:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.9,
        numReviews: 18,
      },
      {
        name: "Ultra-Slim Mechanical Laptop Stand",
        description:
          "Ergonomic aluminum laptop riser for improved airflow, posture, and clean desk setups.",
        price: 45.99,
        category: "Accessories",
        stock: 40,
        imageUrl:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.4,
        numReviews: 29,
      },
      {
        name: "Aromatic Ceramic Studio Lamp",
        description:
          "Soft warm ambiance lighting with a modern minimalist ceramic silhouette.",
        price: 79.99,
        category: "Furniture",
        stock: 18,
        imageUrl:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.3,
        numReviews: 15,
      },
      {
        name: "Ergonomic Wireless Gaming Mouse",
        description:
          "Ultra-fast 2.4GHz wireless connection, 16,000 DPI optical sensor, and customizable side buttons.",
        price: 69.99,
        category: "Electronics",
        stock: 35,
        imageUrl:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        ratings: 4.7,
        numReviews: 42,
      },
    ];

    await Product.insertMany(products);

    console.log("✅ Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`❌ Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
