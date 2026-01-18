"use server";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { cache } from "react";

const { dbConnect, collections } = require("@/lib/dbConnect");
const cartCollection = dbConnect(collections.CART);

export const handleCart = async (productId) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const query = { email: user?.email, productId: new ObjectId(productId) };
  const isAdded = await cartCollection.findOne(query);

  if (isAdded) {
    const result = await cartCollection.updateOne(query, {
      $inc: { quantity: 1 },
    });
    return { success: Boolean(result.modifiedCount) };
  } else {
    const product = await dbConnect(collections.PRODUCTS).findOne({
      _id: new ObjectId(productId),
    });

    const newData = {
      productId: product?._id,
      email: user?.email,
      title: product.title,
      quantity: 1,
      image: product.image,
      price: product.price - (product.price * product.discount) / 100,
      username: user?.name,
    };

    const result = await cartCollection.insertOne(newData);
    return { success: result.acknowledged };
  }
};

export const getCart = cache(async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const result = await cartCollection.find({ email: user?.email }).toArray();
  
  // Serialize ObjectIds to prevent client component errors
  return result.map(item => ({
    _id: item._id.toString(),
    productId: item.productId?.toString() || item.productId,
    email: item.email,
    title: item.title,
    quantity: item.quantity,
    image: item.image,
    price: item.price,
    username: item.username,
  }));
});

export const deleteItemsFromCart = async (id) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (id?.length !== 24) return { success: false };

  const result = await cartCollection.deleteOne({
    _id: new ObjectId(id),
    email: user?.email,
  });

  return { success: Boolean(result.deletedCount) };
};

export const increaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity > 10) {
    return { success: false, message: "Maximum 10 items per product" };
  }

  const result = await cartCollection.updateOne(
    { _id: new ObjectId(id), email: user?.email },
    { $inc: { quantity: 1 } }
  );

  return { success: Boolean(result.modifiedCount) };
};

export const decreaseItemDb = async (id, quantity) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  if (quantity <= 1) {
    return { success: false, message: "Quantity cannot be less than 1" };
  }

  const result = await cartCollection.updateOne(
    { _id: new ObjectId(id), email: user?.email },
    { $inc: { quantity: -1 } }
  );

  return { success: Boolean(result.modifiedCount) };
};

export const clearCart = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return { success: false };

  const result = await cartCollection.deleteMany({ email: user?.email });
  return { success: result.deletedCount > 0 };
};