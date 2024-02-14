import React, { useState, useEffect, useContext } from "react";
import Layout from "./../components/Layout/Layout";
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";
import toast from "react-hot-toast";
import Carousel from '.././components/Layout/Carousel'
import Filters from "../components/Layout/Filters";
import { Modal } from "antd";

const Home = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);

  const useCart = useContext(CartContext)
  const { cart, setCart } = useCart
  let page = 1
  const navigate = useNavigate()
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };


  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };


  const loadMore = async () => {
    try {
      page = page + 1
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
      console.log(page)
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (checked.length === 0 && radio.length === 0) getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);




  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
      setTotal(data?.products?.length)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Shopify - The Best Shopping Website "}>
      <div className="container-fluid row mt-3">
        <div >
          <button className="filterBtn" onClick={() => setIsModalOpen(true)}><i className="fa-solid fa-filter"></i></button>
          <Modal title="Filters" open={isModalOpen} footer={null} onCancel={handleCancel}>
            <Filters handleFilter={handleFilter} setRadio={setRadio} categories={categories} />
          </Modal>
        </div>
        <div className="col-md-12" >
          <Carousel />
        </div>
        <div className="col-md-12 col-sm-1 m-auto">
          <h1 className="text-center">All Products</h1>
          <InfiniteScroll className=""
            dataLength={total}
            next={loadMore}
            hasMore={products && products.length < total}
            loader={<Loader />}
          >
            <div className="d-flex flex-wrap text-center">
              {products?.map((p) => {
                let flag = false
                for (let i = 0; i < cart.length; i++) {
                  if (cart[i]._id === p._id) {
                    flag = true;
                    break;
                  }
                }
                return (
                  <>
                    <div className="card m-2" style={{ width: "14rem" }} >
                      <div style={{
                            cursor: "pointer"
                          }} onClick={() => navigate(`/product/${p.slug} `)}>

                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top cursor-pointer"
                          style={{
                            height: "14rem",
                            width: "13.9rem",
                            objectFit: "contain"
                          }}
                          alt={p.name} onClick={() => navigate(`/product/${p.slug} `)}
                        />
                        <div className="card-body" >
                          <h5 className="card-title" style={{
                            cursor: "pointer"
                          }} onClick={() => navigate(`/product/${p.slug} `)}>{p.name}</h5>
                          <p className="card-text" style={{
                            cursor: "pointer"
                          }} onClick={() => navigate(`/product/${p.slug} `)}> ₹ {p.price}</p>
                        </div>
                      </div>
                          <div className="text-center">
                            {flag ?
                              <button className=" btn-goto-cart " onClick={() => {
                                navigate("/cart")
                              }}>Go To Cart</button>
                              :
                              <button className=" btn-to-cart " onClick={() => {
                                setCart([...cart, p])
                                localStorage.setItem("cart",
                                  JSON.stringify([...cart, p]))
                                toast.success("Item added to cart")

                              }}>Add To Cart</button>
                            }

                          </div>
                    </div>
                  </>
                )
              })}
            </div>
          </InfiniteScroll>

        </div>
      </div>
    </Layout>
  );
};

export default Home;