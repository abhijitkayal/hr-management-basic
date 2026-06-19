import dns from "node:dns";

dns.setServers([
  "8.8.8.8",
  "8.8.4.4",
]);

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI");
}

declare global {
  var mongooseCache:
    | {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      }
    | undefined;
}

const cached = global.mongooseCache || {
  conn: null,
  promise: null,
};

global.mongooseCache = cached;

export async function connectDB() {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("🔄 Connecting MongoDB...");
      
      cached.promise = mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/hr-management-basic?retryWrites=true&w=majority&appName=HACKETHIC", {
        serverSelectionTimeoutMS: 10000,
      });
    }

    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");

    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error(error);
    throw error;
  }
}