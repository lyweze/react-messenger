import React, { useState } from "react";
import Message from "../Message/Message"; // Assuming Message is a separate component

function ChatArea({
	activeChat,
	chats,
	messages,
	newMessage,
	onMessageChange,
	onSendMessage,
	onKeyPress,
}) {
	const currentChat = chats[activeChat];
	const currentMessages = messages[activeChat] || [];

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

	const [setMessages] = useState(initialMessages);
	const [setNewMessage] = useState("");

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

	return (
		<div className="chat-area">
			<div className="chat-header">
				<div className="chat-header-info">
					<div className="avatar">{currentChat?.name.charAt(0)}</div>
					<div>
						<div className="chat-title">{currentChat?.name}</div>
						<div className="chat-status">
							{currentChat?.online ? "в сети" : "был(а) недавно"}
						</div>
					</div>
				</div>
				<div className="chat-actions">
					<button>
						<i className="fas fa-info-circle"></i>
					</button>
				</div>
			</div>
			<div className="messages-container">
				{currentMessages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</div>
			<div className="input-area">
				<div className="input-container">
					<div className="input-actions">
						<button>
							<i className="far fa-smile"></i>
						</button>
						<button>
							<i className="fas fa-paperclip"></i>
						</button>
					</div>
					<textarea
						className="message-input"
						placeholder="Сообщение..."
						value={newMessage}
						onChange={onMessageChange}
						onKeyPress={onKeyPress}
						rows={1}
					/>
				</div>
				<button className="send-button" onClick={onSendMessage}>
					<i className="fas fa-paper-plane"></i>
				</button>
			</div>
		</div>
	);
}

export default ChatArea;
