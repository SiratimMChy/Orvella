"use server";

import { collections, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/sendEmail";

export const postUser = async (payload) => {
  const { email, password, name } = payload;

  if (!email || !password) {
    return { success: false, message: "Email and password required" };
  }

  const isExist = await dbConnect(collections.USERS).findOne({
    email: email.toLowerCase(),
  });

  if (isExist) {
    return { success: false, acknowledged: false };
  }

  const newUser = {
    provider: "credentials",
    name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 14),
    role: "user",
  };

  const result = await dbConnect(collections.USERS).insertOne(newUser);

  if (result.acknowledged) {
    await sendEmail({
      to: email,
      subject: "Welcome to Orvella!",
      html: `<h1>Welcome ${name}!</h1><p>Your account has been created successfully.</p>`,
    });
  }

  return {
    ...result,
    insertedId: result.insertedId?.toString(),
  };
};

export const loginUser = async (payload) => {
  const { email, password } = payload;

  if (!email || !password) return null;

  const user = await dbConnect(collections.USERS).findOne({
    email: email.toLowerCase(),
  });

  if (!user) return null;

  const isMatched = await bcrypt.compare(password, user?.password);
  return isMatched ? user : null;
};