import React, { useContext ,useEffect,useState} from 'react'
import { SearchContext } from '../../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../styles/searchStyle.css'
import { AiOutlineSearch } from 'react-icons'
import { Modal } from "antd";
import SearchBox from './SearchModal/SearchBox'


const SearchInput = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product")
            setProducts(data?.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllProducts()
    },[])

    const useSearch = useContext(SearchContext)
    const { values, setValues } = useSearch

    const navigate = useNavigate()
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const { data } = await axios.get(`/api/v1/product/search/${values.keyword}`)
    //         setValues({
    //             ...values,
    //             results: data.result,
    //         })
    //         navigate("/search ")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    return (
        <>
            {/* <form className="d-flex width" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2 search-input" type="search" placeholder="Search" aria-label="Search" value={values.keyword} onChange={(e)=> setValues({...values,keyword:e.target.value})}/>
                    <button className="search-btn" type="submit"> <i class=" fa-solid fa-magnifying-glass"></i> </button>
            </form> */}
        <button className="search-btn" onClick={showModal}>Search <i class=" fa-solid fa-magnifying-glass"></i> </button>
        <Modal closable={false} footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <SearchBox products={products} handleOk={handleOk}/>
        </Modal>
        </>
    )
}

export default SearchInput
