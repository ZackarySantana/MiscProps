import { useEffect } from "react";

// What it does:
// - Sets up an (optional) listener to the "eventType"
// - Returns a dispatch factory that creates functions for your "eventType"
// Features:
// - Memoizing the listener is a performance enhancer!
// - You can just put in the "eventType" for a dispatcher
export function useEvent(eventType = "none", listener = "none") {
  // To register the listener
  useEffect(() => {
    if (eventType !== "none" && listener !== "none") {
      /*let wrappedCallback = (event) => {
        listener(event.detail);
      };*/
      document.addEventListener(eventType, listener);
      return () => document.removeEventListener(eventType, listener);
    }
  }, [eventType, listener]);

  // Returns a function that returns a function
  // This means it automatically wraps it for the end user
  return (detail) => {
    return () => document.dispatchEvent(new CustomEvent(eventType, { detail }));
  };
}
