import React, { useState, useEffect } from "react";
// import AuthContext from "./context/AuthContext";

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import axios from "axios";
import "./App.css";
import { memo } from "react";

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

// let isLogin = localStorage.getItem("isLogin") === "true";
let isLogin = false; // Замените на реальную проверку авторизации

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

			setTimeout(() => {
				document.getElementsByClassName("messages-container")[0].scrollTop =
					document.getElementsByClassName("messages-container")[0].scrollHeight;
			}, 0);
		}
	};

	// useEffect(() => {
	// 	/**
	// 	 * Function to check the authentication status of the user.
	// 	 * It verifies the presence and validity of the token stored in localStorage.
	// 	 * If the token is invalid or missing, it removes the token, resets the user state, and alerts the user.
	// 	 * If the token is valid, it configures axios to include the token in requests and fetches user data.
	// 	 */
	// 	const checkAuthStatus = async () => {
	// 		const token = localStorage.getItem("authToken");
	// 		try {
	// 			// Retrieve the token from localStorage
	// 			if (
	// 				typeof token !== "string" ||
	// 				token.trim() === "" ||
	// 				token === undefined
	// 			) {
	// 				console.log("Токен отсутствует или имеет неверный формат");
	// 				localStorage.removeItem("authToken");
	// 				const axiosInstance = axios.create();
	// 				delete axiosInstance.defaults.headers.common["Authorization"];
	// 				console.log(
	// 					"Ваш токен недействителен. Пожалуйста, войдите снова."
	// 				); /* */
	// 				setUser(null);

	// 				try {
	// 					const response = await axios.get("/api/auth/me");
	// 					if (response.data && response.data.user) {
	// 						setUser(response.data.user);
	// 					} else {
	// 						console.error("Unexpected response format:", response.data);
	// 						setUser(null);
	// 					}
	// 				} catch (error) {
	// 					console.error("Error fetching user data:", error);
	// 					setUser(null);
	// 				}
	// 			}

	// 			if (token) {
	// 				console.log("Токен найден:", token);
	// 				// Configure axios to include the token in requests
	// 				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	// 				// Validate the token by fetching user data
	// 				const response = await axios.get("/api/auth/me");
	// 				setUser(response.data.user);
	// 			}
	// 		} catch (error) {
	// 			// Handle invalid token by removing it
	// 			localStorage.removeItem("authToken");
	// 			delete axios.defaults.headers.common["Authorization"];
	// 		} finally {
	// 			if (!token) {
	// 				console.log("Токен не найден, пользователь не авторизован");
	// 				setUser(null);
	// 			}
	// 		}
	// 	};

	// 	checkAuthStatus();
	// }, []);

	const [isLogin, setIsLogin]  = useState(null);
	useEffect(() => {
		const checkLoginStatus = () => {
			if (isLogin) {
				// Если пользователь авторизован, устанавливаем состояние
				<Navigate to="/" replace />;
			}
			else {
				// Если пользователь не авторизован, перенаправляем на страницу авторизации
				<Navigate to="/auth" replace />;
			}
		}

		checkLoginStatus();
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/auth" element={<Auth />} />
				<Route
					path="/"
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
				<Route path="*" element={<Navigate to="/auth" replace />} />
			</Routes>
		</Router>
	);
}

export default App;
