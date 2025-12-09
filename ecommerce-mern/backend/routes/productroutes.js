import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET all products + search + price filter
// Example URLs:
//   GET /api/products
//   GET /api/products?search=iphone
//   GET /api/products?minPrice=10000&maxPrice=50000
router.get("/", async (req, res) => {
  try {
    const { search, minPrice, maxPrice } = req.query;

    const query = {};

    // text search on name (case-insensitive)
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // numeric filter on price
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// GET single product by id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = new Product({ name, price, description, image });
    const created = await product.save();

    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: "Invalid product data" });
  }
});

// UPDATE product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.description = description ?? product.description;
    product.image = image ?? product.image;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
