import React, { useRef } from "react";
import useElementSize from "./useElementSize";

// What it does:
// - A component that displays the width and height of an <h1>
// - Every window resize, the dimensions of the <h1> get tested, if they
//   change, then the component gets rerendered
// Note:
// - For performance, this isn't that bad since it won't be constantly changing but
//   for big components, you should use the example below.
export function DisplayDimensions() {
  const ref = useRef(); // Creates the ref to use on the <h1>
  const [width, height] = useElementSize(ref); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <h1 ref={ref}>Header</h1>
      <p>Width of header: {width}</p>
      <p>Height of header: {height}</p>
    </div>
  );
}

// What it does:
// - A component that displays the width and height of an <h1>
// - It ONLY rerenders when the width changes past 800, or the height past 20 or 30
// - This has increased performance but requires manual numbers
export function UpdateOnSize() {
  const ref = useRef(); // Creates the ref for the <h1>
  const [width, height] = useElementSize(ref, [800], [20, 30]); // Calls hook, which returns array of [width, height]

  return (
    <div>
      <h1 ref={ref}>Header</h1>
      <p>Width of header: {width}</p>
      <p>Height of header: {height}</p>
    </div>
  );
}
