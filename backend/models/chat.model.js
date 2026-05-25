import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		message: {
			type: String,
			required: true,
		},

		role: {
			type: String,
			enum: ["customer", "admin"],
			default: "customer",
		},
	},
	{
		timestamps: true,
	}
);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;