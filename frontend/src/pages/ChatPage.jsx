import { useEffect, useState } from "react";

import axios from "../lib/axios";

import { socket } from "../lib/socket";

const ChatPage = () => {

    const [messages, setMessages] = useState([]);

    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {

        fetchMessages();

        socket.on("receiveMessage", (message) => {

            setMessages((prev) => {

                const exists = prev.find(
                    (msg) => msg._id === message._id
                );

                if (exists) return prev;

                return [...prev, message];
            });
        });

        return () => {

            socket.off("receiveMessage");
        };

    }, []);

    const fetchMessages = async () => {

        try {

            const res = await axios.get("/chat");

            setMessages(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const sendMessage = async () => {

        if (!newMessage.trim()) return;

        try {

            const res = await axios.post("/chat", {
                message: newMessage,
            });

            socket.emit(
                "sendMessage",
                res.data
            );

            setNewMessage("");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-gray-900 text-white p-6">

            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-bold text-emerald-400 mb-6">
                    Live Support Chat
                </h1>

                <div className="bg-gray-800 rounded-xl p-4 h-[500px] overflow-y-auto border border-gray-700">

                    {
                        messages.map((msg) => (

                            <div
                                key={msg._id}
                                className={`mb-4 flex ${msg.role === "admin"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >

                                <div
                                    className={`max-w-xs px-4 py-2 rounded-xl ${msg.role === "admin"
                                        ? "bg-emerald-500"
                                        : "bg-gray-700"
                                        }`}
                                >

                                    <p className="text-sm font-semibold mb-1">
                                        {
                                            msg.sender?.name
                                        }
                                    </p>

                                    <p>
                                        {
                                            msg.message
                                        }
                                    </p>

                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className="flex gap-4 mt-4">

                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) =>
                            setNewMessage(
                                e.target.value
                            )
                        }
                        placeholder="Type message..."
                        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-emerald-500 hover:bg-emerald-600 px-6 py-3 rounded-lg font-semibold"
                    >

                        Send

                    </button>

                </div>

            </div>

        </div>
    );
};

export default ChatPage;