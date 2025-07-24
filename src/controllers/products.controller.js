// products.controller.js
import * as model from "../models/products.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await model.getAllProducts();
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { name } = req.query;
    const products = await model.getAllProducts();

    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );

    return res.json(filteredProducts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await model.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: "No existe el producto" });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, categories } = req.body;
    const newProduct = await model.createProduct({ name, price, categories });

    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await model.deleteProduct(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
