import React from "react";
import ReactDOM from "react-dom";

// Components testing in main
import TestFetchData from "./fetchdata/test";

ReactDOM.render(
	<React.StrictMode>
		<TestFetchData />
	</React.StrictMode>,
	document.getElementById("root")
);
