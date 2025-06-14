import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the contact schema
const contactSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email_id: { type: String, required: true },
  mobile_number: { type: String, required: true }, // use String for better mobile number handling
  query: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Export the model
const Contact = mongoose.model("Contact", contactSchema, "user_query"); // change the collection name any time
export default Contact;