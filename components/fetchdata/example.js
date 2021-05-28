import React from "react";
import Data from "./FetchData";

// A dummy prop to log all the props, helps to understand the structure of the data!
const Display = (props) => {
  console.log(props);
  return <h1>Hey!</h1>;
};

// What this does:
// - Requests data from "https://randomuser.me/api"
// - Once response is recieved, the component "Display" is rendered with data in the props
// Useful features:
// - Passes props in to Display once it is rendered
// - Uses default fallback while it waits for response
export const InLineComponent = (props) => {
  return (
    <Data
      Display={Display}
      whereToFetch="https://randomuser.me/api"
      {...props}
    />
  );
};

// What this does:
// - Requests data from "https://randomuser.me/api"
// - Once response is recieved, the child component "Display" is rendered with data in the props
// Useful features:
// - Multiple children compatibility
// - Easier to read
export const ChildComponent = (props) => {
  return (
    <Data whereToFetch="https://randomuser.me/api">
      <Display dummyProp={"this is a dummy prop!"} {...props} />
    </Data>
  );
};

// What this does:
// - Requests data from "https://randomuser.me/api"
// - Uses a default component, that just dumps all the data recieved in to some text on screen
// Useful features:
// - Quickly display data from an api
export const DefaultComponent = (props) => {
  return <Data whereToFetch="https://randomuser.me/api" {...props} />;
};

// What this does:
// - Requests data from "https://randomuser.me/api"
// - Once data is recieved, puts it in the props of "Display"
// - While data is being fetched, Fallback is rendered
// Useful features:
// - "props" are automatically put in to Display (last line in Data)
// - Useful for pagination (dummy data can be used or blurry blobs)
export const CustomFallback = (props) => {
  return (
    <Data
      Display={Display}
      Fallback={<h1>Custom Fallback!</h1>}
      whereToFetch="https://randomuser.me/api"
      {...props}
    />
  );
};
// A useful use for the custom fallback is pagination:
// Fallback={<Display data={{ name: "Test" } /* Dummy data */}></Display>}
// Is a quick example of what could be used above

// What it does:
// - Same as above examples
// - Doesn't cache the data, without including this, FetchData automatically caches the data
export const WithNoCache = (props) => {
  return (
    <Data
      Display={Display}
      cacheData={false}
      whereToFetch="https://randomuser.me/api"
      {...props}
    />
  );
};
