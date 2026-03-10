"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async (page = 1, limit = 9) => {
  const skip = (page - 1) * limit;
  
  const [products, total] = await Promise.all([
    dbConnect(collections.PRODUCTS).find().skip(skip).limit(limit).toArray(),
    dbConnect(collections.PRODUCTS).countDocuments()
  ]);
  
  return {
    products: products.map(product => ({
      ...product,
      _id: product._id.toString()
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

export const getSingleProduct = async (id) => {
  if (!id || typeof id !== 'string' || id.length !== 24) {
    return {};
  }
  const query = { _id: new ObjectId(id) };

  const product = await dbConnect(collections.PRODUCTS).findOne(query);

  if (!product) {
    return {};
  }

  return { ...product, _id: product._id.toString() } || {};
};

export const getBestSellers = async (limit = 8) => {
  const products = await dbConnect(collections.PRODUCTS)
    .find()
    .sort({ sold: -1 })
    .limit(limit)
    .toArray();
  
  return products.map(product => ({
    ...product,
    _id: product._id.toString()
  }));
};

export const getNewArrivals = async (limit = 4) => {
  const products = await dbConnect(collections.PRODUCTS)
    .find()
    .sort({ _id: -1 })
    .limit(limit)
    .toArray();
  
  return products.map(product => ({
    ...product,
    _id: product._id.toString()
  }));
};