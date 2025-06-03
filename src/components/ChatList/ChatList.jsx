import React from "react";

const ChatList = function(props) {
  const { chats, activeChat, onChatSelect } = props;
  
return (
    <div className="sidebar">
        <div className="sidebar-header">
            <h2>Чаты</h2>
            <input 
                type="text"
                className="search-box" 
                placeholder="Поиск" 
            />
        </div>
        <div className="chat-list">
            {chats.map(chat => (
                <div 
                    key={chat.id} 
                    className={`chat-item ${activeChat === chat.id ? 'active' : ''}`} 
                    onClick={() => onChatSelect(chat.id)}
                >
                    <div className="avatar">{chat.name.charAt(0)}</div>
                    <div className="chat-info">
                        <div className="chat-name">{chat.name}</div>
                        <div className="chat-last-message">{chat.lastMessage}</div>
                    </div>
                    <div className="chat-time">
                        {chat.time}
                        {chat.unread > 0 && <span className="unread-badge">{chat.unread}</span>}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
}

export default ChatList;