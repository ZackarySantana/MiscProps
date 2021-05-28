import { useLayoutEffect, useCallback, useState, useRef, useMemo } from "react";

export function useElementSize(ref, updateOnWidths, updateOnHeights) {
  const [size, setSize] = useState([0, 0]);
  const oldSize = useRef(size);
  const alwaysUpdate = useMemo(
    () => !Array.isArray(updateOnWidths) && !Array.isArray(updateOnHeights),
    [updateOnWidths, updateOnHeights]
  );
  const updateSize = useCallback(() => {
    let bounds = ref.current.getBoundingClientRect();
    if (
      oldSize.current[0] !== bounds.width ||
      oldSize.current[1] !== bounds.height
    ) {
      let update = alwaysUpdate;
      if (!alwaysUpdate) {
        if (Array.isArray(updateOnWidths) && updateOnWidths.length > 0) {
          updateOnWidths.forEach((width) => {
            if (oldSize.current[0] < width && bounds.width >= width) {
              update = true;
            } else if (oldSize.current[0] >= width && bounds.width < width) {
              update = true;
            }
          });
        }
        if (Array.isArray(updateOnHeights)) {
          updateOnHeights.forEach((height) => {
            if (oldSize.current[1] < height && bounds.height >= height) {
              update = true;
            } else if (oldSize.current[1] >= height && bounds.height < height) {
              update = true;
            }
          });
        }
      }
      if (update) {
        setSize(() => {
          oldSize.current = [bounds.width, bounds.height];
          return oldSize.current;
        });
      }
    }
  }, [ref, updateOnWidths, updateOnHeights, alwaysUpdate]);
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [updateSize]);
  return size;
}
