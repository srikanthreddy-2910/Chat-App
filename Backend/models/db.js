import mongoose from "mongoose";

export const connectdb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb", con.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); 
  }
};
   