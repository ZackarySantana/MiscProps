import { useEffect, useState } from "react";

export default (value: unknown, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const id = setTimeout(() => setDebouncedValue(value), delay);

        return () => clearTimeout(id);
    }, [value]);

    return debouncedValue;
};
