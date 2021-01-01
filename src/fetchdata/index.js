import React, { Suspense, cloneElement } from "react";

let cache = {};
let loading = {};

const FetchData = (whereToFetchData) => {
	// Do Axios request to that ^
	// return axios.get(whereToFetchData);
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				title: "Title of post",
				author: "Author of post",
				content: "content of post",
			});
		}, 5000);
	});
};

const LoadData = (props) => {
	const { whereToFetchData, cacheData, Display } = props;
	if (whereToFetchData in cache) {
		if (React.isValidElement(Display)) {
			return cloneElement(Display, ...cache[whereToFetchData]);
		} else {
			return <Display {...cache[whereToFetchData]} />;
		}
	} else if (whereToFetchData in loading) {
		throw loading[whereToFetchData];
	} else {
		loading[whereToFetchData] = FetchData(whereToFetchData);
		loading[whereToFetchData].then((res) => {
			delete loading[whereToFetchData];
			if (res instanceof String) {
				cache[whereToFetchData] = JSON.parse(res);
			} else {
				cache[whereToFetchData] = res;
			}
		});
		if (!cacheData) {
			loading[whereToFetchData].then(() => {
				setTimeout(() => {
					delete cache[whereToFetchData];
				}, 100);
			});
		}
		throw loading[whereToFetchData];
	}
};

const DefaultDisplay = (props) => {
	let Children = Object.keys(props).map((propName) => {
		return <p key={propName}>{props[propName]}</p>;
	});
	return <>{Children}</>;
};

export default (props) => {
	let {
		Display,
		FallBack = <p>Loading...</p>,
		whereToFetchData,
		cacheData = true,
	} = props;
	if (Display === undefined) {
		if (props.children === undefined) {
			Display = (data) => {
				return <DefaultDisplay {...data} />;
			};
		} else {
			Display = (data) => {
				return <>{cloneElement(props.children, data)}</>;
			};
		}
	}
	return (
		<Suspense fallback={FallBack}>
			<LoadData
				Display={Display}
				whereToFetchData={whereToFetchData}
				cacheData={cacheData}
			/>
		</Suspense>
	);
};
