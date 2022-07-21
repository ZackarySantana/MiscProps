import React from "react";
import { useEvent } from "./onEvent";

// A sample component that registers a listener, and dispatches an event on click
// This won't actually call because there's nothing dispatching it.
// The next component, dispatches and *would* call this listener!
export function EventListener() {
    // Registering an event listener to the event "custombutton:click"
    useEvent("custombutton:click", (event) => {
        console.log(event); // Log the event object
    });

    return <></>;
}

// A sample component that registers a listener, and dispatches an event on click
export function EventAndDispatch() {
    // Registering an event listener to the event "custombutton:click"
    const customButtonClick = useEvent("custombutton:click", (event) => {
        console.log(event); // Log the event object
    });

    // The button dispatches a custombutton:click
    return (
        <div>
            <p>Heyyy</p>
            <button onClick={customButtonClick({ type: "A test" })}>
                Click me!
            </button>
        </div>
    );
}
