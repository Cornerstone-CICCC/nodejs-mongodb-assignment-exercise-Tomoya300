import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IsProduct extends Document {
    productName: string,
    productPrice: number
}

const productSchema: Schema = new Schema({
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true }
})

export const Product = mongoose.model<IsProduct>('Product', productSchema)