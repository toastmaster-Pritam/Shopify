import { createContext, useState } from "react";


export const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword:"",
        results:[],
    });
    

    return (
        <SearchContext.Provider value={{ values, setValues }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchProvider }
