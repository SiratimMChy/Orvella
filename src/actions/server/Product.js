"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const getProducts = async () => {
  const products = await dbConnect(collections.PRODUCTS).find().toArray();
  return products.map(product => ({
    ...product,
    _id: product._id.toString()
  }));
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