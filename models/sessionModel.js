import mongoose from "mongoose";
//session hmyn btata ha k user kahan kahan login ha ya kaha kaha uska account use ho rha ha
//Session database ka wo register hai jahan server aapki login history rakhta hai taake aap kisi bhi waqt kahin se bhi khud ko "Logout" kar saken
const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true // Yeh zaroori hai
  }
}, { timestamps: true });

export const Session = mongoose.model("Session", sessionSchema);