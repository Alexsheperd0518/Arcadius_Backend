import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import SignUp from "../models/SignUp.js";
import ContactUs from "../models/Contact.js";

const router = express.Router();

// SignUp Route
router.post("/signup", async (req, res) => {
  const {
    first_name,
    last_name,
    account_name,
    age,
    email,
    phone,
    password
  } = req.body;

  // Step 1: Validate required fields
  if (!first_name || !last_name || !account_name || !age || !email || !phone || !password) 
  {
    return res.status(400).json({ msg: "Please fill in all required fields." });
  }

  try {
    // Step 2: Check if the user already exists
    let user = await SignUp.findOne({ email });
    if (user) 
    {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Step 3: Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 4: Create new user
    user = new SignUp({
      first_name,
      last_name,
      account_name,
      age,
      email,
      phone,
      password: hashedPassword
    });

    await user.save();
    return res.status(201).json({ msg: "User registered successfully" });
  } 
  
  catch (err) 
  {
    console.error("Signup error:", err.message);
    return res.status(500).json({ msg: "Server error. Please try again later." });
  }
});



// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await SignUp.findOne({ email: email });
    if (!user) 
    {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }
    
    console.log("User found:", user);
    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.password);
    
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);
    
    if (!isMatch) 
    {
      return res.status(401).json({ message: "Incorrect password" });
    }
    
    const payload = { id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, phone: user.phone};
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    
    res.status(200).json({
      token,
      user: payload,
      msg: `Welcome to the Arcadius, ${user.account_name}`
      });
    } 
      
    catch (error)
    {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  });



// Conact-Us Route
router.post("/contact-us", async (req, res) => {
  try 
  {
    const contact = new ContactUs(req.body);
    await contact.save();
    res.status(201).json({message: "Query details saved successfully!"});
  } 

  catch (error) 
  {
    console.error("Error saving query:", error);
    res.status(500).json({message: "Failed to save query."});
  }
});
        
export default router;