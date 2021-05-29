import React from "react";
import { useEvent } from "./events";

// A sample component that registers a listener, and dispatches an event on click
export default function Example() {
  // Registering an event listener to the event "custombutton:click"
  const customButtonClick = useEvent("custombutton:click", (event) => {
    console.log(event); // Log the event object
  });

  // The button dispatches a custombutton:click
  return (
    <div>
      <p>Heyyy</p>
      <button onClick={customButtonClick({ type: "A test" })}>Click me!</button>
    </div>
  );
}
