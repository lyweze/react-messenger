import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
		<script
			type="text/javascript"
			src="https://cdn.scaledrone.com/scaledrone.min.js"
		/>
	</React.StrictMode>
);
