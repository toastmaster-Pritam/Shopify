import React from 'react'
import "../../pages/Admin/styles/CreateCategory.css"

export default function CategoryForm({handleSubmit,value,setValue}) {

    
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
                    <input type="text" className="form-control input-form" placeholder='Enter New Category' value={value} 
                    onChange={(e) => setValue(e.target.value)} />
                </div>
                <div className="text-center">

                <button type="submit" className="btn create-btn">Submit</button>
                </div>
            </form>
        </>
    )
}
