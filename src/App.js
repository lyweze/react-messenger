import React, { useState } from "react";
import "./App.css";

import ChatList from "./components/ChatList/ChatList";
import ChatArea from "./components/ChatArea/ChatArea";

const chats = [
	{
		id: 0,
		name: "Анна Петрова",
		lastMessage: "Выглядит отлично! Очень похоже на iOS Telegram.",
		time: "10:35",
		unread: 0,
		online: true,
	},
	{
		id: 1,
		name: "Иван Сидоров",
		lastMessage: "Да, конечно! Буду ждать.",
		time: "09:20",
		unread: 2,
		online: false,
	},
	{
		id: 2,
		name: "Елена Смирнова",
		lastMessage: "Спасибо за напоминание!",
		time: "08:50",
		unread: 0,
		online: false,
	},
	{
		id: 3,
		name: "Максим Волков",
		lastMessage: "Завтра созвонимся, обсудим проект",
		time: "Вчера",
		unread: 1,
		online: true,
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
	1: [
		{
			id: 1,
			text: "Привет! Встречаемся сегодня в 18:00?",
			sent: false,
			time: "09:15",
		},
		{ id: 2, text: "Да, конечно! Буду ждать.", sent: true, time: "09:20" },
	],
	2: [
		{
			id: 1,
			text: "Доброе утро! Не забудь документы на встречу.",
			sent: false,
			time: "08:45",
		},
		{ id: 2, text: "Спасибо за напоминание!", sent: true, time: "08:50" },
	],
};

function App() {
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
			console.log(initialMessages);
		}
	};

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
}

export default App;