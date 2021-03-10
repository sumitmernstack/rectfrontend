import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getCategories } from './helper/adminapicall'

const ManageCategory=()=> {

    const [categories, setCategories] = useState([])
     const {user,token}=isAuthenticated();

  const preload = () => {
  getCategories().then(data => {
     // console.log(data);
      if (data.error) {
       console.log(data?.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload()
      
  }, []);

    return (
        <Base title="Welcome admin" description="Manage Categories here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total {categories.length} products</h2>

         {categories.map((cate,index)=>{
             return(
         
              <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
             <h3 className="text-white text-left">{cate.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${cate._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button onClick={() => {
                   
                }} 
                className="btn btn-danger">
                  Delete
                </button>

              </div>
              </div>
              
             );}
         )}
         
        </div>
      </div>
    </Base>
    )
}
export default  ManageCategory;