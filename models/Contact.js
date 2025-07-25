import mongoose from "mongoose";
const { Schema } = mongoose;

// Define the contact schema
const contactSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  query: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Export the model
const ContactUs = mongoose.model("Contact", contactSchema, "contact_details"); // change the collection name any time
export default ContactUs;