// Import the modules
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";  
import Contact from "./Models/contact_model.js";
import Signup from "./Models/signup_model.js";


// Run the express server
const app = express()
const port = 4000
const connectDB = "mongodb+srv://dushyantswaroop1808:0518Dush$@database-2.tbciaj5.mongodb.net/user-details" // connect the cloud server


// Middleware
app.use(cors());
app.use(express.json()); 


// Database Connection
mongoose.connect(connectDB)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("DataBase Connection Error:", err));


// Route to handle contact form submission
app.post('/api/user_query', async (req, res) => {
  try 
  {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({message: "Contact saved successfully!"});
  } 

  catch (error) 
  {
    console.error("Error saving contact:", error);
    res.status(500).json({message: "Failed to save contact."});
  }
});


// Route to handle SignUp form submission
app.post('/api/signup', async (req, res) => {
  try {
    const {
      first_name, 
      last_name, 
      display_username,
      age,
      email_id, 
      country, 
      create_password
    } = req.body;

    const hashed = await bcrypt.hash(create_password, 10);
    const user = new Signup({
      first_name,
      last_name,
      display_username,
      age,
      email_id,
      country,
      create_password: hashed
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error signing up." });
  }
});


// Route to Handle the validation login page
app.post('/api/login', async (req, res) => {
  const {user_id, password} = req.body;

  try {
    const user = await Signup.findOne({display_username: user_id});

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: 'User not found' });
    }

    console.log("User found:", user);
    console.log("Entered Password:", password);
    console.log("Stored Hash:", user.create_password);

    const isMatch = await bcrypt.compare(password, user.create_password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({message: 'Incorrect password'});
    }

    return res.status(200).json({message: `Welcome to the Arcadius, ${user.display_username}!`});
  } 

  catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({message: 'Server error'});
  }
});


// start server
app.listen(port, () => {
  console.log(`Server is running on MongoDB Cloud!`)
});