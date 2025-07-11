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
	if (!currentChat) {
		return <div className="chat-area">Выберите чат для начала общения</div>;
	}

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
				<div className={"input-container"}>
					<div className="input-actions">
						<button>
							<i className="far fa-smile"></i>
						</button>
						<button>
							<i className="fas fa-paperclip"></i>
						</button>
					</div>
					<input
						name="message-input"
						type="text"
						className="message-input"
						placeholder="Сообщение..."
						value={newMessage}
						onChange={onMessageChange}
						onKeyDown={onKeyPress}
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
