// all the routes that point to openai
import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();
// allows us to use our routes in a different file
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    console.log("🚀 ~ file: openai.js:14 ~ router.post ~ text:", text);
    res.status(200).json({ text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
export default router;
