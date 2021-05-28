import { useLayoutEffect, useState, useRef } from "react";

// What it does:
// - Checks for the size changing when the browser is resized
// - The size must change for the component to rerender
// What are the arguments:
// - ref = A (required) reference to the object that we want to use the size of (React's ref object)
// - updateOnWidths = An (optional) array to only update the component at specific widths
// - updateOnHeights = An (optional) array to only update the components at specific heights
export default function useElementSize(ref, updateOnWidths, updateOnHeights) {
  const [size, setSize] = useState([-1, -1]); // Used to keep track of the size of the element
  // useState is used because we would like to rerender the component when the size changes

  const oldSize = useRef(size); // Holds the old size of the element
  // useRef is used to persist the old data while not updating the component

  useLayoutEffect(() => {
    // Defines our function to test if we should update the size
    const updateSize = () => {
      // Gets the bounds of our element
      let bounds = ref.current.getBoundingClientRect();
      // Tests if the element changed in size
      if (
        oldSize.current[0] !== bounds.width ||
        oldSize.current[1] !== bounds.height
      ) {
        // Tests if there is arrays, if not, this is true (so an update happens)
        let update =
          !Array.isArray(updateOnWidths) && !Array.isArray(updateOnHeights);
        if (!update) {
          // Tests if it is first render
          if (oldSize.current[0] === -1) {
            update = true;
          }

          // Tests if it should update based on the widths
          if (
            !update &&
            Array.isArray(updateOnWidths) &&
            updateOnWidths.length > 0
          ) {
            updateOnWidths.forEach((width) => {
              if (oldSize.current[0] < width && bounds.width >= width) {
                update = true;
              } else if (oldSize.current[0] >= width && bounds.width < width) {
                update = true;
              }
            });
          }

          // Tests if it should update based on the heights
          if (!update && Array.isArray(updateOnHeights)) {
            updateOnHeights.forEach((height) => {
              if (oldSize.current[1] < height && bounds.height >= height) {
                update = true;
              } else if (
                oldSize.current[1] >= height &&
                bounds.height < height
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
            oldSize.current = [bounds.width, bounds.height];
            return oldSize.current;
          });
        }
      }
    };

    // Registers the event listener
    window.addEventListener("resize", updateSize);

    // Runs the initial update size to grab the size
    updateSize();

    // Deregisters the event listener
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [ref, updateOnWidths, updateOnHeights]);
  return size;
}
