import mongoose from "mongoose";

const newLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NewsLetter = mongoose.models.NewLetter || mongoose.model("NewLetter", newLetterSchema);
export default NewsLetter;
