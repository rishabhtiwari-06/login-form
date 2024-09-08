
import User from "@/model/User";
import dbConnect from "@/lib/connectDB";

export default async function handler(req, res) {
  try {
    await dbConnect();

    if (req.method === "POST") {
      const { email, password } = req.body;

      // Checking email and password 
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      // Checking if the user exists
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(201).json({ message: "User with this email already exists" });
        }
      } catch (error) {
          console.log("There is an error") 
      }

      // Creating a new user 
      const user = new User({ email, password });

      // Saving the user to the database
      await user.save();

      return res.status(201).json({ success: true, data: user });
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
