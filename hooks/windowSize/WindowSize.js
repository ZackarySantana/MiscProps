import { useLayoutEffect, useCallback, useState, useRef, useMemo } from "react";

export function useWindowSize(updateOnWidths, updateOnHeights) {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  const oldSize = useRef(size);
  const alwaysUpdate = useMemo(
    () => !Array.isArray(updateOnWidths) && !Array.isArray(updateOnHeights),
    [updateOnWidths, updateOnHeights]
  );
  const updateSize = useCallback(() => {
    let update = alwaysUpdate;
    if (!alwaysUpdate) {
      if (Array.isArray(updateOnWidths) && updateOnWidths.length > 0) {
        updateOnWidths.forEach((width) => {
          if (oldSize.current[0] < width && window.innerWidth >= width) {
            update = true;
          } else if (oldSize.current[0] >= width && window.innerWidth < width) {
            update = true;
          }
        });
      }
      if (Array.isArray(updateOnHeights)) {
        updateOnHeights.forEach((height) => {
          if (oldSize.current[1] < height && window.innerHeight >= height) {
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
    if (update) {
      setSize(() => {
        oldSize.current = [window.innerWidth, window.innerHeight];
        return oldSize.current;
      });
    }
  }, [updateOnWidths, updateOnHeights, alwaysUpdate]);
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);
  return size;
}
