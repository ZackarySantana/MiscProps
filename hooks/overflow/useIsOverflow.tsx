import type { RefObject } from "react";
import { useEffect, useState } from "react";

export default (
    ref: RefObject<HTMLDivElement>,
    callback?: (hasOverflow: boolean) => void,
    bufferPercent?: number
) => {
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        const { current } = ref;
        const parent = current?.parentElement;

        const eventListener = () => {
            if (!current || !parent) return;
            const b = (current.clientWidth / 100) * (bufferPercent || 0);

            const rightEndParent = parent.clientWidth + parent.scrollLeft;
            const rightEndChild = current.clientWidth + current.offsetLeft;
            const hasOverflowRight = rightEndChild - rightEndParent - b > 0;

            const leftEndParent = parent.scrollLeft;
            const leftEndChild = current.offsetLeft;
            const hasOverflowLeft = leftEndParent - leftEndChild - b > 0;

            setIsOverflow(hasOverflowRight || hasOverflowLeft);

            if (callback) callback(hasOverflowRight || hasOverflowLeft);
        };

        if (!current || !parent) return;
        parent.addEventListener("scroll", eventListener);
        eventListener();

        return () => parent.removeEventListener("scroll", eventListener);
    }, [bufferPercent, callback, ref]);

    return isOverflow;
};
