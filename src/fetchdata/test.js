import React from "react";

import Data from "./index";

const Display = (data) => {
	console.log(data.title);
	return <h1>Hey!</h1>;
};

export const WithProps = () => {
	return <Data Display={Display} whereToFetch="Bloop" />;
};

export const WithChildren = () => {
	return (
		<Data whereToFetch="Bloop">
			<Display />
		</Data>
	);
};

export const WithDefaultComponent = () => {
	return <Data whereToFetch="Bloop" />;
};
