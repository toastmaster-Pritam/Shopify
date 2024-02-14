import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd';
import './styles/CreateCategory.css'

export default function CreateCategory() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategory] = useState([])
    const [selected, setSelected] = useState(null)
    const [updatedName, setUpdatedName] = useState("")




    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("/api/v1/category/get-category")
            if (data?.success) {
                setCategory(data?.category)

            }

        } catch (error) {
            console.log(error)
            toast.error("Failed in getting category")
        }
    }

    useEffect(() => {
        getAllCategory()
        // eslint-disable-next-line
    }, [])


    const [name, setName] = useState("")
    const handleOk = async (e) => {

        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (data.success) {
                toast.success(`${updatedName} updated successfully`)
                setSelected(null)
                setUpdatedName("")
                setIsModalOpen(false);
                getAllCategory()
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("somthing went wrong in input form");
        }
    };


    return (
        <>
            <Layout title={"Create Category - RajKart"}>
                <div className="container-fluid p-3">
                    <div className="row">
                        <div className="col-md-3">
                            <AdminMenu />

                        </div>
                        <div className="col-md-6">
                            <h1 >Manage Category</h1>
                            <div className="p-3">
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div >
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {categories?.map((c) => (
                                            <>
                                                <tr>
                                                    <td key={c._id}>{c.name}</td>
                                                    <td>
                                                        <button className='btn edit-btn' onClick={
                                                            () => {
                                                                setIsModalOpen(true);
                                                                setUpdatedName(c.name);
                                                                setSelected(c)
                                                            }
                                                        }>Edit</button>
                                                        <button className="btn dlt-btn" onClick={async ()=>{
                                                            try {
                                                                let answer = window.prompt("Are You Sure want to delete this category ? ");
                                                                if (!answer) return;
                                                                
                                                                let t=c.name;
                                                                const { data } = await axios.delete(`/api/v1/category/delete-category/${c._id}`)
                                                                if (data.success) {
                                                                    toast.success(`${t} is deleted`)
                                                                    getAllCategory()
                                                                }
                                                            } catch (error) {
                                                                toast.error("Something went wrong")
                                                            }
                                                        }}>Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                            <Modal title="Edit Category" open={isModalOpen} footer={null} onCancel={handleCancel}>
                                <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleOk} />
                            </Modal>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}
