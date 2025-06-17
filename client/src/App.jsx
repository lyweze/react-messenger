import React, { useState, useEffect } from "react";
// import AuthContext from "./context/AuthContext";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
} from "react-router-dom";

import axios from "axios";
import "./App.css";

import ChatList from "./components/ChatList/ChatList";
import ChatArea from "./components/ChatArea/ChatArea";
import Auth from "./components/Auth-page/Auth";
import Loading from "./components/Loading-page/Loading-page";

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
		{ id: 1, text: "Входящее", sent: false, time: "10:30" },
		{
			id: 2,
			text: "Исходящее",
			sent: true,
			time: "10:32",
		},
	],
};

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
					// const response = await axios.get("http://localhost:3000/api/chats");
					// if (response.data) {
					// 	console.log("Данные успешно загружены:", response.data);
					// 	// setChats(response.data.chats);
					// 	// setMessages(response.data.messages);
					// }
					await new Promise((resolve) => setTimeout(resolve, 2000));
					setMessages(initialMessages);
				} catch (error) {
					console.error("Ошибка при загрузке данных:", error);
				} finally {
					setLoading(false);
					switch (isLogin) {
						case true:
							navigate("/messages", { replace: true });
							break;
						case false:
							navigate("/auth", { replace: true });
							break;
					}
					console.log("Загрузка данных завершена");
				}
			} else {
				setLoading(false);
				navigate("/auth", { replace: true });
			}
		};

		fetchData();
	}, [isLogin]);

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
