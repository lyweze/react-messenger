import React, { useMemo, useState } from "react";
import "./App.css";
import { memo } from "react";

import ChatList from "./components/ChatList/ChatList";
import ChatArea from "./components/ChatArea/ChatArea";
import Auth from "./components/Auth-page/Auth";

const chats = [
	{
		id: 0,
		name: "Анна Петрова",
		lastMessage: "",
		time: "10:35",
		unread: 0,
		online: false,
	},
];

const initialMessages = {
	0: [
		{ id: 1, text: "Привет! Как дела?", sent: false, time: "10:30" },
		{
			id: 2,
			text: "Привет! Все хорошо, спасибо. Что нового?",
			sent: true,
			time: "10:32",
		},
		{
			id: 3,
			text: "Ничего особенного. Просто проверяю новый мессенджер.",
			sent: false,
			time: "10:33",
		},
		{
			id: 4,
			text: "Выглядит отлично! Очень похоже на iOS Telegram.",
			sent: true,
			time: "10:35",
		},
	],
};

// let isLogin = localStorage.getItem("isLogin") === "true";
let isLogin = false; // Замените на реальную проверку авторизации

function App() {
	if (!isLogin) {
		return <Auth />;
	}

	const [activeChat, setActiveChat] = useState(0);
	const [messages, setMessages] = useState(initialMessages);
	const [newMessage, setNewMessage] = useState("");

	const handleChatSelect = (chatId) => {
		setActiveChat(chatId);
	};

	const handleMessageChange = (e) => {
		setNewMessage(e.target.value);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;

		const currentMessages = messages[activeChat] || [];
		const newMessageObj = {
			id: currentMessages.length + 1,
			text: newMessage,
			sent: true,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};

		setMessages({
			...messages,
			[activeChat]: [...currentMessages, newMessageObj],
		});
		setNewMessage("");
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage();

			setTimeout(() => {
				document.getElementsByClassName("messages-container")[0].scrollTop =
					document.getElementsByClassName("messages-container")[0].scrollHeight;
			}, 0);
		}
	};

	switch (isLogin) {
		case true:
			console.log("Пользователь авторизован");
			return (
				<div className="messenger-container">
					<ChatList
						chats={chats}
						activeChat={activeChat}
						onChatSelect={handleChatSelect}
					/>
					<ChatArea
						activeChat={activeChat}
						chats={chats}
						messages={messages}
						newMessage={newMessage}
						onMessageChange={handleMessageChange}
						onSendMessage={handleSendMessage}
						onKeyPress={handleKeyPress}
					/>
				</div>
			);
			break;
		case false:
			console.log("Пользователь не авторизован");
			return <Auth />;
			break;
		default:
			console.log("Неизвестный статус авторизации");
			return <Auth />;
	}
}

export default App;
