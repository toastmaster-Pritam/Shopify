import React, { useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AuthContext } from '../../context/auth'
import { toast } from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { CartContext } from '../../context/Cart'

export default function Header() {

  const useAuth = useContext(AuthContext)
  const { auth, setAuth } = useAuth
  const useCart = useContext(CartContext)
  const { cart } = useCart
  const categories = useCategory()
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth")
    toast.success("Logout Successfully")
  }
  let len = cart?.length


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Shopify</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse " id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mt-2 mx-3 ">
            <span className='nav-item mx-5 mt-1'>

              <SearchInput />
            </span>

              <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </a>
                <ul className="dropdown-menu">



                  {categories?.map((c) => (

                    <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                  ))}
                </ul>
              </li>

              {
                !auth.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                  </>
                ) : (<>
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user?.name}
                    </a>
                    <ul className="dropdown-menu">

                      < li className="dropdown-item">
                        <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavLink>
                      </li>
                      < li className="dropdown-item">
                        <NavLink onClick={handleLogOut} className="nav-link" to="/login">Logout</NavLink>
                      </li>
                    </ul>
                  </li>
                </>
                )
              }


              <li className="nav-item">
                <NavLink className="nav-link cart" to="/cart">Cart<span className='cart-badge position-absolute top-5 start-100 translate-middle badge rounded-pill bg-danger'>{len}</span></NavLink>

              </li>


            </ul>

          </div>
        </div>
      </nav >
    </>
  )
}
