export const getResponseFromAi = async (req, res) => {
  res.send("hi");
};


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


// app.post("/", protect, authorize("user"), async (req, res) => {
//     const messages = req.body.data.messages;
//     const question = messages[messages.length - 1].msg;
//     // const context = text;
//     // console.log("context => "+context);
//     // const response = await axios.post(`${process.env.ML_SERVER_URL}qna/`, {
//     //   question: question,
//     //   context: context,
//     // });
//     // console.log(response.data.output);
//     const response = "hi";
//     res.send({
//       bool: false,
//       msg: response,
//     });
//   });