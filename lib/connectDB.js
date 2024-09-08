import mongoose from "mongoose";

require('dotenv').config()
console.log(process.env)

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
// lib/mongodb.js
// import mongoose from 'mongoose';

// let isConnected = false; // track connection status

// export const connectToDatabase = async () => {
//   if (isConnected) {
//     console.log("Using existing database connection");
//     return;
//   }

//   try {
//     if (mongoose.connection.readyState === 0) {  // 0 means disconnected
//       await mongoose.connect("mongodb://localhost:27017/form", {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       isConnected = true;
//       console.log("Database connected successfully");
//     }
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }
// };
