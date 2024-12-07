import React, { useState, useEffect } from "react";
import { useWebSocket } from "@/components/WebSocketContext";

const ChatComponent = ({ projectId }) => {
    const { sendMessage, setupStompClient } = useWebSocket();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Set up the WebSocket connection
    useEffect(() => {
        if (projectId) {
            console.log("Connecting WebSocket for project:", projectId);
            setupStompClient(projectId);
        }
    }, [projectId, setupStompClient]);

    // Dummy message handler for incoming messages (replace with real WebSocket logic)
    const handleIncomingMessage = (message) => {
        setMessages((prev) => [...prev, message]);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messagePayload = {
                from: "User", // Replace with actual username
                to: projectId,
                text: newMessage.trim(),
            };
            sendMessage(messagePayload);
            setMessages((prev) => [...prev, { ...messagePayload, self: true }]);
            setNewMessage("");
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-white shadow-lg mt-6">
            <h3 className="text-lg font-semibold mb-4">Chat</h3>
            <div className="h-48 overflow-y-auto border rounded-md bg-gray-100 p-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 ${msg.self ? "text-right" : "text-left"}`}
                    >
                        <span
                            className={`font-medium ${msg.self ? "text-blue-600" : "text-gray-700"}`}
                        >
                            {msg.self ? "You" : msg.from}:
                        </span>{" "}
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-4 space-x-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatComponent;
