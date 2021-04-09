import React from "react";
import ReactDOM from "react-dom";

// COMPONENTS
// Fetchdata library: To use make sure to correct the fetchD
import {
	WithProps,
	WithChildren,
	WithDefaultComponent,
	WithFallback,
	WithNoCache,
} from "./fetchdata/test";

ReactDOM.render(
	<React.StrictMode>
		<WithChildren test="test" />
	</React.StrictMode>,
	document.getElementById("root")
);
