import mongoose from "mongoose";
import Conversation from "../models/Conversation.js";
import axios from "axios";
export const saveConversation = async (req, res) => {
  try {
    const { user_id } = req.params;
    const newConversation = new Conversation({
      user_id,
    });
    await newConversation.save();
    // console.log(newConversation._id.toString());
    res.status(201).json(newConversation);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const getAllConversations = async (req, res) => {
  try {
    const user_id = req.params.userid;
    const allConversations = await Conversation.find({ user_id });
    res.status(201).json(allConversations);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const conversation_id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(conversation_id)) {
      return res.status(400).send("Invalid conversation ID");
    }
    const conversation = await Conversation.findOne({ _id: conversation_id });
    if (!conversation) {
      return res.status(404).send("Conversation not found");
    }
    res.status(201).json(conversation);
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};

export const updateConversation = async (req, res) => {
  try {
    const conversation_id = req.params.id;
    const user_id = req.params.userid;
    // console.log(req.body);
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversation_id,
      { $push: { messages: req.body } },
      { new: true } // This option returns the updated document
    );

    if (!updatedConversation) {
      return res.status(404).send("Conversation not found");
    }
    if (updatedConversation.messages.length === 1) {
      // console.log(req.body.msg);
      // try {
      //   const title = await axios.post(`http://0.0.0.0:8000/name/`, {
      //     question: req.body.msg,
      //   });
      //   console.log(title);
      //   updatedConversation.name = title.data.output;
      //   await updatedConversation.save();
      // } catch (e) {
      //   console.log(e.message);
      // }
      updatedConversation.name = req.body.msg;
      await updatedConversation.save();
    }
    res.send(updatedConversation);
    // res.send(req.body.message)
  } catch (e) {
    res.status(501).json({ error: e.message });
  }
};
// export default saveConversation;
