import React from "react";

import Data from "./FetchData";

// This is just a dummy component that can be replaced with any component
// The props is the data from the call
const Display = (props) => {
  console.log(props);
  return <h1>Hey!</h1>;
};

// This implementation is showing off the Display component (which recieves the data from the API call as the props) being in the props of Data
// This is useful for one liners that just want to pass the data to another nested component
export const WithProps = (props) => {
  return <Data Display={Display} whereToFetch="Bloop" {...props} />;
};

// This implementation is using the children of data and functions the same one as the top
// This is useful when you want to pass other props to the display component or have multiple children
export const WithChildren = (props) => {
  return (
    <Data
      whereToFetch="https://localhost:3000/books"
      Fallback={<Display data={{ author: "temp", title: "Title" }}></Display>}
    >
      <Display dummyProp={"this is a dummy prop!"} {...props} />
    </Data>
  );
};

// This implementation simply creates a <p> tag for every key:value recieved from the call
// This is extremely useful when you just want to view the data this prop is getting without making a dummy component yourself
export const WithDefaultComponent = (props) => {
  return <Data whereToFetch="Bloop" {...props} />;
};

// This is an example of a custom fallback while the API is doing its request
// You can pass any component inside, even a minature game!
export const WithFallback = (props) => {
  return (
    <Data
      Display={Display}
      Fallback={<h1>Custom Fallback!</h1>}
      whereToFetch="Bloop"
      {...props}
    />
  );
};

// This is an example that retrieve's the data but then removes it from the cache 100ms later
// This implementation removes it slightly later because it still needs to retrieve it for the first render
// But after that, another rerender will re-fetch the data
export const WithNoCache = () => {
  return <Data Display={Display} cacheData={false} whereToFetch="Bloop" />;
};
