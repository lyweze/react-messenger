import React from "react";

function Message({ message }) {
    return (
        <div className={`message ${message.sent ? "sent" : "received"}`}>
            <div className="message-bubble">
                {message.text}
                <div className="message-time">
                    {message.time}
                    {message.sent && (
                        <i
                            className="fas fa-check-double"
                            style={{
                                marginLeft: "4px",
                                fontSize: "10px",
                                color: "#34C759",
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Message;
