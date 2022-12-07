import { useEffect } from "react";

// What it does:
// - Sets up an (optional) listener to the "eventType"
// - Returns a dispatch factory that creates functions for your "eventType"
// Features:
// - Memoizing the listener is a performance enhancer!
// - You can just put in the "eventType" for a dispatcher
export function useEvent(eventType: string, listener?: (data: any) => void) {
    // To register the listener
    useEffect(() => {
        if (listener == null) {
            return;
        }
        document.addEventListener(eventType, listener);
        return () => document.removeEventListener(eventType, listener);
    }, [eventType, listener]);

    // Returns a function that returns a function
    // This means it automatically wraps it for the end user
    return (data: any) => {
        return () => document.dispatchEvent(new CustomEvent(eventType, { detail: data }));
    };
}
