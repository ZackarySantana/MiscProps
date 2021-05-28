import React, { Suspense, cloneElement } from "react";

let cache = {};
let loading = {};

const fetchData = (whereToFetch) => {
  // Do Axios request to that ^
  // return axios.get(whereToFetch);
  return fetch(whereToFetch).then((response) => response.json());
};

const LoadData = (props) => {
  const { whereToFetch, cacheData, Display, ...otherProps } = props;
  if (whereToFetch in cache) {
    if (React.isValidElement(Display)) {
      return cloneElement(Display, {
        ...cache[whereToFetch],
        ...otherProps,
      });
    } else {
      return <Display {...cache[whereToFetch]} {...otherProps} />;
    }
  } else if (whereToFetch in loading) {
    throw loading[whereToFetch];
  } else {
    loading[whereToFetch] = fetchData(whereToFetch);
    loading[whereToFetch].then((res) => {
      delete loading[whereToFetch];
      if (res instanceof String) {
        cache[whereToFetch] = JSON.parse(res);
      } else {
        cache[whereToFetch] = res;
      }
    });
    if (!cacheData) {
      loading[whereToFetch].then(() => {
        setTimeout(() => {
          delete cache[whereToFetch];
        }, 100);
      });
    }
    throw loading[whereToFetch];
  }
};

const DefaultDisplay = (props) => {
  let Children = Object.keys(props).map((propName) => {
    return <p key={propName}>{propName + ': "' + props[propName] + '"'}</p>;
  });
  return <>{Children}</>;
};

export default function FetchContext(props) {
  let {
    Display,
    Fallback = <p>Loading...</p>,
    whereToFetch,
    cacheData = true,
    children,
    ...otherProps
  } = props;
  if (Display === undefined && props.children === undefined) {
    Display = (data) => {
      return <DefaultDisplay {...data} />;
    };
  } else if (props.children !== undefined) {
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
