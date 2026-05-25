import { io } from "socket.io-client";

export const socket = io(
	"https://ai-mern-ecommerce-master.onrender.com",
	{
		withCredentials: true,
	}
);