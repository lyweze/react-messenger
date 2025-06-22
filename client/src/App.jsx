import React, { useState, useEffect } from "react";
// import AuthContext from "./context/AuthContext";

import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import ChatList from "./components/ChatList/ChatList";
import ChatArea from "./components/ChatArea/ChatArea";
import Auth from "./components/Auth-page/Auth";
import Loading from "./components/Loading-page/Loading-page";

const initialMessages = {
	0: [
		{ id: 1, text: "Входящее", sent: false, time: "10:30" },
		{
			id: 2,
			text: "Исходящее",
			sent: true,
			time: "10:32",
		},
	],
	1: [
		{ id: 1, text: "Привет!", sent: false, time: "10:40" },
		{ id: 2, text: "Как дела?", sent: true, time: "10:41" },
	],
};

const chats = [
	{
		id: 0,
		name: "Анна Петрова",
		lastMessage:
			// initialMessages[0][initialMessages[0].length - 1].text || "Нет сообщений",
			'',
		time: "10:35",
		unread: 0,
		online: false,
		user_id: 0,
	},
	{
		id: 1,
		name: "Иван Иванов",
		lastMessage:
			// initialMessages[1][initialMessages[1].length - 1].text || "Нет сообщений",
			'',
		time: "10:40",
		unread: 0,
		online: true,
		user_id: 1,
	},
];

let ws = null; // Переменная для хранения WebSocket соединения

// localStorage.setItem("isLogin", "false");

function App() {
	const [activeChat, setActiveChat] = useState(0);
	const [messages, setMessages] = useState(initialMessages);
	const [newMessage, setNewMessage] = useState("");
	const [loading, setLoading] = useState(true);

	const [isLogin, setIsLogin] = useState(
		localStorage.getItem("isLogin") === "true"
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			navigate("/", { replace: true });
		}
	}, [navigate, isLogin]);

	useEffect(() => {
		const fetchData = async () => {
			if (isLogin) {
				try {
					// const delay = (ms) =>
					// 	new Promise((resolve) => setTimeout(resolve, ms));
					// await delay(2000); // Задержка в 2 секунды

					ws = new WebSocket("ws://localhost:8080");
				} catch (error) {
					console.error("Websocket error:", error);
				} finally {
					console.log("WebSocket подключен");
					ws.onmessage = (e) => {
						console.log(e.data);
					};

					setLoading(false);
					navigate("/messages", { replace: true });
				}
			} else {
				setLoading(false);
				navigate("/auth", { replace: true });
			}
		};

		fetchData();
	}, [isLogin]);

	const handleChatSelect = (chatId) => {
		setMessages(0);
		setActiveChat(chatId);
		setTimeout(() => {
			setMessages(initialMessages);
		}, 0);
		chats[chatId].unread = 0;
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
			user_id: activeChat,
		};
		ws.send(JSON.stringify(newMessageObj));

		chats[activeChat].lastMessage = newMessage;
		chats[activeChat].time = newMessageObj.time;

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

	return (
		<Routes>
			<Route path="/auth" element={<Auth />} />
			<Route
				path="/messages"
				element={
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
				}
			/>
			<Route path="/" element={<Loading />} />
		</Routes>
	);
}

export default App;
