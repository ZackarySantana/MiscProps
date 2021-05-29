import React from "react";
import useWindowSize from "./useWindowSize";

// What it does:
// - A component that displays the width and height of the window
// - Every window resize, the component gets rerendered
// Note:
// - For performance, this isn't that bad since it won't be constantly changing but
//   for big components, you should use the example below.
export function DisplayDimensions() {
  const [width, height] = useWindowSize(); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <p>Width of window: {width}</p>
      <p>Height of window: {height}</p>
    </div>
  );
}

// What it does:
// - A component that displays the width and height of the window
// - It ONLY rerenders when the width changes past 800, or the height past 20 or 30
// - This has increased performance but requires manual numbers
export function UpdateOnSize() {
  const [width, height] = useWindowSize([800], [20, 30]); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <p>Width of window: {width}</p>
      <p>Height of window: {height}</p>
    </div>
  );
}
