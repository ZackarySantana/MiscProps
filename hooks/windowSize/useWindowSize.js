import { useLayoutEffect, useState, useRef } from "react";

// What it does:
// - Checks if the size of the browser has changed
// - When it has, rerender the component
// - Using the arguments increase render performance and avoid useless rerenders
// What are the arguments:
// - updateOnWidths = An (optional) array to only update the component at specific widths
// - updateOnHeights = An (optional) array to only update the component at specific heights
export default function useWindowSize(updateOnWidths, updateOnHeights) {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    // useState is used because we would like to rerender the component when the size changes

    const oldSize = useRef(size); // Holds the old size of the element
    // useRef is used to persist the old data while not updating the component

    useLayoutEffect(() => {
        // Defines our function to test if we should update the size
        let updateSize = () => {
            // Tests if there is arrays, if not, this is true (so an update happens)
            let update =
                !Array.isArray(updateOnWidths) &&
                !Array.isArray(updateOnHeights);
            if (!update) {
                // Tests if it should update based on the widths
                if (
                    Array.isArray(updateOnWidths) &&
                    updateOnWidths.length > 0
                ) {
                    updateOnWidths.forEach((width) => {
                        if (
                            oldSize.current[0] < width &&
                            window.innerWidth >= width
                        ) {
                            update = true;
                        } else if (
                            oldSize.current[0] >= width &&
                            window.innerWidth < width
                        ) {
                            update = true;
                        }
                    });
                }

                // Tests if it should update based on the heights
                if (!update && Array.isArray(updateOnHeights)) {
                    updateOnHeights.forEach((height) => {
                        if (
                            oldSize.current[1] < height &&
                            window.innerHeight >= height
                        ) {
                            update = true;
                        } else if (
                            oldSize.current[1] >= height &&
                            window.innerHeight < height
                        ) {
                            update = true;
                        }
                    });
                }
            }

            // Should it update?
            if (update) {
                // Then change size and oldsize
                setSize(() => {
                    oldSize.current = [window.innerWidth, window.innerHeight];
                    return oldSize.current;
                });
            }
        };

        // Registers the event listener
        window.addEventListener("resize", updateSize);

        // Deregisters the event listener
        return () => {
            window.removeEventListener("resize", updateSize);
        };
    }, [updateOnWidths, updateOnHeights]);
    return size;
}
