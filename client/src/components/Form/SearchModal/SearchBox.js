import React, { useContext, useState } from 'react'
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import { SearchContext } from '../../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SearchBox({products, handleOk}) {

    const useSearch = useContext(SearchContext)
    const { values, setValues } = useSearch
    const [results, setResults] = useState([]);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({
                ...values,
                results: data.result,
            })
            handleOk()
            navigate("/search ")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="App">
                <div className="search-bar-container">
                    <form onSubmit={handleSubmit}>

                    <SearchBar setResults={setResults} products={products} />
                    </form>
                    {results && results.length > 0 && <SearchResultsList results={results} />}
                </div>
            </div>
        </>
    )
}
