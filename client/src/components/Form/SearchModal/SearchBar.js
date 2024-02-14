import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.css";
import { SearchContext } from "../../../context/Search";

export const SearchBar = ({ setResults, products }) => {
  const [input, setInput] = useState("");
  const useSearch = useContext(SearchContext)
  const { values, setValues } = useSearch


  const getValidProd = (keyword) => {
    const results = products.filter( (prod)=>{
      return(
        keyword &&
        prod &&
        prod.name &&
        prod.description &&
        (prod.name.toLowerCase().includes(keyword.toLowerCase()) || prod.description.toLowerCase().includes(keyword.toLowerCase()))
      )
    }

    )
    setResults(results)
    console.log(results)
  }


  
  const handleChange = (value) => {
    setValues({
      ...values,
      keyword: value
    })
    setInput(value);
    getValidProd(value);
  };

  return (
    <div className="input-wrapper">
      <i class=" fa-solid fa-magnifying-glass"></i> 
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        autoFocus
      />
    </div>
  );
};
