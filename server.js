import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getAllConversations,
  getConversationById,
  saveConversation,
  updateConversation,
} from "./controllers/helper.js";
import axios from "axios";
import dotenv from "dotenv";
import { getContext } from "./controllers/getContext.js";
import { mongoConnect } from "./utils/mongoConnect.js";
import { upload } from "./middleware/multer.js";
import { PdfReader } from "pdfreader";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

// Connecting to DB
mongoConnect();

// Getcontext
let text
const fetchContext = async (filePath) => {
  try {
    text = await getContext(filePath);
    // console.log(text);
  } catch (error) {
    console.error(error);
  }
};

fetchContext("./data/Love.pdf");
// HANDLING ROUTES
app.post("/", async (req, res) => {
  const messages = req.body.data.messages;
  const question = messages[messages.length - 1].msg;
  const context = text;
  // console.log("context => "+context);
  const response = await axios.post(`${process.env.ML_SERVER_URL}qna/`, {
    question: question,
    context: context,
  });
  console.log(response.data.output);
  res.send({
    bool: false,
    msg: response.data.output,
  });
});

// Conversation Routes
app.post("/conversation/:user_id", saveConversation);
app.get("/conversation/:userid", getAllConversations);
app.get("/conversation/:userid/:id", getConversationById);
app.post("/conversation/:userid/:id/message", updateConversation);

// Admin Routes
app.post("/uploadpdf", upload.single("pdffile"), (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
