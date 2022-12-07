import React, { useEffect, useState } from "react";
import useDebounce from "./useDebounce";

// This is a simple input that uses debouncing on an input and waits 700ms before doing
// the next API call
export function DummySearch() {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState<string>();
    const debounce = useDebounce(inputValue, 700);

    useEffect(() => {
        // API call
        async function getNewResults() {
            const newSearchResults = await API_CALL(debounce);
            setSearchResults(newSearchResults);
        }
        getNewResults();
    }, [debounce]);


    return (
        <div>
            <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            {searchResults}
        </div>
    );
}

async function API_CALL(value: string) {
    await setTimeout(() => { }, 500);

    return "Hello " + value;
}