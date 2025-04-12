import { Request, Response } from "express";
import { Product, IsProduct } from "../models/product.model";

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to fetch all prodocuts' })
    }
}

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({message: 'Product not found'})
            return
        }
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Unable to get product'})
    }
}

const createProduct = async (req: Request<{}, {}, IsProduct>, res: Response) => {
    try {
        const { productName, productPrice } = req.body
        const product = await Product.create({ productName, productPrice})
        res.status(201).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to add product'})
    }
}

const updateProductById = async (req: Request<{id: string}, {}, Partial<IsProduct>>, res: Response) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to update student'})
    }
}

const deleteStudentById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(product)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Unable to delete student'})
    }
}

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteStudentById
}