import React, { useState } from "react";

const ChatList = function (props) {
	const { chats, activeChat, onChatSelect } = props;

	const [, forceUpdate] = useState(0);

	function handleForceUpdate() {
		forceUpdate((x) => x + 1); // увеличиваем значение, чтобы вызвать ререндер
	}

	return (
		<div className="sidebar">
			<div className="sidebar-header">
				<h2>Чаты</h2>
				<input
					name="chats-input"
					type="text"
					className="search-box"
					placeholder="Поиск"
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							e.target.blur();
							const searchTrim = e.target.value.trim().toLowerCase();
							const chatsTrim = [];
							for (let i = 0; i < chats.length; i++) {
								if (chats[i].name.toLowerCase().includes(searchTrim)) {
									chatsTrim.push(chats[i]);
									props = {
										...props,
										chats: chatsTrim,
									};

									chats = chatsTrim;
									handleForceUpdate();
								}
							}
							console.log("Search result:", chatsTrim);
						}
					}}
				/>
			</div>
			<div className="chat-list">
				{chats.map((chat) => (
					<div
						key={chat.id}
						className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
						onClick={() => onChatSelect(chat.id)}
					>
						<div className="avatar">{chat.name.charAt(0)}</div>
						<div className="chat-info">
							<div className="chat-name">{chat.name}</div>
							<div className="chat-last-message">{chat.lastMessage}</div>
						</div>
						<div className="chat-time">
							{chat.time}
							{chat.unread > 0 && (
								<span className="unread-badge">{chat.unread}</span>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatList;
