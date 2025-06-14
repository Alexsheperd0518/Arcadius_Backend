import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the signup schema
const signupSchema = new Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  display_username: {type: String, required: true, unique: true}, // username should be unique
  age: {type: Number, required: true, min: 0}, // added basic validation for age
  email_id: {type: String, required: true, unique: true, lowercase: true, trim: true},
  country: {type: String, required: true},
  create_password: {type: String, required: true},
  date: {type: Date, default: Date.now}
});

// Export the model
const Signup = mongoose.model("Signup", signupSchema,"signup_details"); // change the collection name any time
export default Signup;