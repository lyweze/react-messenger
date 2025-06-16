import React from "react";
import "./Loading-page.css";

// document.addEventListener("DOMContentLoaded", () => {
// 	setTimeout(() => {
// 		document.querySelector(".loading-content").style.opacity = "1";
// 	}, 100);
// });

const LoadingPage = () => {
	return (
		<div className="loading-container">
			<div className="loading-dots">
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</div>
		</div>
	);
};

export default LoadingPage;
