import React,{ createContext, useState } from "react"; 

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [search ,setSearch] = useState('')
    const [searchHistory, setSearchHistory] = useState([]);

    const addSearch = value => {
        setSearch(value);
        setSearchHistory(prevHistory => [...prevHistory, value]);
    }

    return(
        <SearchContext.Provider value={{search ,setSearch ,addSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

