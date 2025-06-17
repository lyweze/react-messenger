import React from "react";

function Message({ message }) {
	return (
		<div className={`message ${message.sent ? "sent" : "received"}`}>
			<div className="message-bubble">
				{message.text}
				<div className="message-time">{message.time}</div>
			</div>
		</div>
	);
}

export default Message;
