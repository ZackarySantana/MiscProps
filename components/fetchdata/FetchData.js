import React, { Suspense, cloneElement } from "react";

let cache = {};
let loading = {};

// Used to fetch data from a specific URL
const fetchData = (whereToFetch) => {
  // fetches from the URL, then translate the response to JSON (as the promise resolves)
  return fetch(whereToFetch).then((response) => response.json());
};

// Loads and returns an element that contains the data
// Throws if the data is not done fetching
const LoadData = (props) => {
  // Grabs URL (whereToFetch), if it should cache the data (cacheData),
  // the Display component (Display), and finally props to be passed (otherProps)
  const { whereToFetch, cacheData, Display, ...otherProps } = props;

  // Tests if the URL is in the cache
  if (whereToFetch in cache) {
    // Tests if Display is a valid element
    if (React.isValidElement(Display)) {
      // Clones it and passes the data (cache[whereToFetch]) and other props to be passed (otherProps)
      return cloneElement(Display, {
        ...cache[whereToFetch],
        ...otherProps,
      });
    } else {
      // This assumes Display is a valid Component rather than Element
      return <Display {...cache[whereToFetch]} {...otherProps} />;
    }

    // Tests if the data is still loading
  } else if (whereToFetch in loading) {
    throw loading[whereToFetch]; // Throw because it is still loading

    // The data isn't cached, and isn't loading-so start it to loading
  } else {
    loading[whereToFetch] = fetchData(whereToFetch); // Adds the promise to the loading array

    // Runs the cache script/parsing script when the loading is finished
    loading[whereToFetch].then((res) => {
      delete loading[whereToFetch]; // Removes it from loading

      // Caches it (parse if it is in string form)
      if (res instanceof String) {
        cache[whereToFetch] = JSON.parse(res);
      } else {
        cache[whereToFetch] = res;
      }
    });

    // If we do NOT cache data
    if (!cacheData) {
      // Afterwards, run a delete script that removes it from the cache in 100ms
      loading[whereToFetch].then(() => {
        setTimeout(() => {
          delete cache[whereToFetch];
        }, 100);
      });
    }

    // We have started loading, so throw
    throw loading[whereToFetch];
  }
};

// A default component to display the data, used if none is provided
const DefaultDisplay = (props) => {
  // Maps all the data to a paragraph tag
  let Children = Object.keys(props).map((propName) => {
    return <p key={propName}>{propName + ': "' + props[propName] + '"'}</p>;
  });

  // Returns the default component
  return <>{Children}</>;
};

export default function FetchContext(props) {
  // Extracts the different props
  let {
    Display,
    Fallback = <p>Loading...</p>,
    whereToFetch,
    cacheData = true,
    children,
    ...otherProps
  } = props;

  // Tests if the Display provided is invalid/not present
  if (Display === undefined && props.children === undefined) {
    // Creates a Display that is the default
    Display = (data) => {
      return <DefaultDisplay {...data} />;
    };

    // This is using the children
  } else if (props.children !== undefined) {
    // Creates a display using the children
    Display = (data) => {
      return (
        <>
          {cloneElement(props.children, {
            data,
            ...otherProps,
          })}
        </>
      );
    };
  }

  // Compiles the final suspense, with fallback, with the loaded data
  return (
    <Suspense fallback={Fallback}>
      <LoadData
        Display={Display}
        whereToFetch={whereToFetch}
        cacheData={cacheData}
        {...otherProps}
      />
    </Suspense>
  );
}
