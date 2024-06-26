import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getAllConversations,
  getConversationById,
  saveConversation,
  updateConversation,
} from "./controllers/convController.js";
import axios from "axios";
import dotenv from "dotenv";
import { getContext } from "./controllers/getContext.js";
import { mongoConnect } from "./utils/mongoConnect.js";
import { upload } from "./middleware/multer.js";
import { PdfReader } from "pdfreader";
import { aiResponse } from "./utils/getAiResponse.js";
import { signin, signup } from "./controllers/userAuth.js";
import { authorize, protect } from "./middleware/auth.js";
import userRoutes from "./routes/userRoutes.js";
import convRoutes from "./routes/convRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
const PORT = process.env.PORT || 4000;

// Connecting to DB
mongoConnect();

// Routing
app.use("/users", userRoutes);
app.use("/conversations", convRoutes);
app.use("/admin", adminRoutes);
app.use("/ai", aiRoutes);

// Getcontext
// let text;
// const ques = "What is Love?";
// const fetchContext = async (filePath) => {
//   try {
//     text = await getContext(filePath);
//     // console.log(text);
//   } catch (error) {
//     console.error(error);
//   }
// };
// fetchContext("./data/Love.pdf");

// HANDLING ROUTES
// app.post("/", protect, authorize("user"), async (req, res) => {
//   const messages = req.body.data.messages;
//   const question = messages[messages.length - 1].msg;
//   // const context = text;
//   // console.log("context => "+context);
//   // const response = await axios.post(`${process.env.ML_SERVER_URL}qna/`, {
//   //   question: question,
//   //   context: context,
//   // });
//   // console.log(response.data.output);
//   const response = "hi";
//   res.send({
//     bool: false,
//     msg: response,
//   });
// });
// // User Routes
// app.post("/signup", signup);
// app.post("/signin", signin);

// // Conversation Routes
// app.post(
//   "/conversations",
//   // protect,
//   // authorize("user"),
//   saveConversation
// );
// app.get("/conversation", protect, authorize("user"), getAllConversations);
// app.get("/conversation/:id", protect, authorize("user"), getConversationById);
// app.post(
//   "/conversation/:id/message",
//   protect,
//   authorize("user"),
//   updateConversation
// );

// // Admin Routes
// app.post(
//   "/uploadpdf",
//   protect,
//   authorize("admin"),
//   upload.single("pdffile"),
//   (req, res) => {
//     res.send("hello");
//   }
// );
app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
