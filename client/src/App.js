import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/user/Dashboard';
import Private from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from './components/Routes/AdminRoute';
import Users from './pages/Admin/Users';
import CreateProduct from './pages/Admin/CreateProduct';
import CreateCategory from './pages/Admin/CreateCategory';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Product from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import AdminOrder from './pages/Admin/AdminOrder';


function App() {
  return (
    <>
      <Routes>

        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard/user" element={<Private />}>
          <Route exaxt path="/dashboard/user" element={<Dashboard />} />
          <Route exaxt path="/dashboard/user/profile" element={<Profile />} />
          <Route exaxt path="/dashboard/user/orders" element={<Order />} />
        </Route>
        <Route exact path="/dashboard/admin" element={<AdminRoute />}>
          <Route exaxt path="/dashboard/admin" element={<AdminDashboard />} />
          <Route exact path="/dashboard/admin/products" element={<Product/>}/>
          <Route exaxt path="/dashboard/admin/create-category" element={<CreateCategory />} />
          <Route exaxt path="/dashboard/admin/create-product" element={<CreateProduct />} />
          <Route exaxt path="/dashboard/admin/product/:slug" element={<UpdateProduct/>} />
          <Route exaxt path="/dashboard/admin/users" element={<Users />} />
          <Route exaxt path="/dashboard/admin/orders" element={<AdminOrder />} />
        </Route>
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/category/:slug" element={<CategoryPage/>}/>
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/search" element={<Search/>}/>
        <Route exact path="/cart" element={<CartPage/>}/>        
        <Route exact path="/product/:slug" element={<ProductDetails/>}/>
        <Route exact path="*" element={<PageNotFound />} />

      </Routes>

    </>
  );
}

export default App;
