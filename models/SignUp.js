import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the signup schema
const signupSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  account_name: { type: String, required: true, unique: true }, // Ensure it's required
  age: {type: Number, required: true}, // Added basic validation for age
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  phone: {type: Number, required: true, min: 10},
  password: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

// Export the model
const SignUp = mongoose.model("Signup", signupSchema,"signup_details"); // change the collection name any time
export default SignUp;