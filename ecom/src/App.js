import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';
import { lazy,Suspense } from 'react';


// import Front from './Components/front';
import LoginPage from './Components/login';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ForgotPass from './Components/ForgotPass';
import Product from './Components/Product';
import Register from './Components/Register';
import ResetPass from './Components/ResetPass';
import ViewProduct from './Components/viewProduct';
import UserCart from './Components/UserCart';
import AddProduct from './Components/admin/addProduct';
import Category from './Components/admin/category';
import AdminIndex from './Components/admin/adIndix';
import ProductsAdmin from './Components/admin/products';
import Test from './Components/GetLogin';
import LoadEditCategory from './Components/admin/editCategory';
import AuthState from './Context/AuthState';
import AuthContext from './Context/AuthContext';
import { useEffect, useState } from 'react';
// const Front = lazy(()=>import('./Components/front'));
import Front from './Components/front';
import Profile from './Components/Profile';
import Payment from './Components/PaymentPage';
import UserOrder from './Components/UserOrder';
import ProductByCagtegory from './Components/ProductByCategory';
import GetallOrders from './Components/admin/ViewAllOrders';


function App() {

  // const[login, setLogin] =useState("Unset Login");
  const [login, setLogin] = useState();
  const[token, setToken] = useState();
  const[admin, setAdmin] = useState();
  const[cartCount, setCartCount] = useState();
  const [countCart, setCountCart]= useState();

  // useEffect(() => {
  //   // Save state to local storage whenever it changes
  //   localStorage.setItem('Login done', login);
  // }, [login]);
  // <Suspense fallback={<div className='text-center'>Data Loading Please Wait....</div>}>
  // </Suspense>

  return (

    <AuthContext.Provider value={{login, setLogin, token, setToken,
      countCart, setCountCart, admin, setAdmin, cartCount, setCartCount}}>
    <BrowserRouter>
    
    <Navbar/>


    <Routes>
     
      <Route index element={<Front />} />
     
      <Route path='/home' element={<Front />} />
     
      <Route path="/signin" element={<LoginPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/forgot-password" element={<ForgotPass/>}/>
      <Route path="/products" element={<Product/>}/>
      <Route path="/register" element={<Register/>}/>
      
      <Route path="/products/:id" element={<ViewProduct/>}/>
      <Route path="/user-cart" element={<UserCart/>}/>
              <Route path="/admin-home" element={<AdminIndex/>}/>
        <Route path="/admin" element={<AdminIndex/>}/>
        <Route path="/admin/view-orders" element={<GetallOrders/>}/>

      <Route path="admin/loadAddProduct" element={<AddProduct/>}/>
      <Route path="admin/category" element={<Category/>}/>
      <Route path="admin/products" element={<ProductsAdmin/>}/>
      <Route path="/editcategory" element={<LoadEditCategory/>}/>
      <Route path="/getlogin" element={<Test/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/checkout" element={<Payment/>}/>
      <Route path="/my-order" element={<UserOrder/>}/>

      
      <Route path="/category/:id" element={<ProductByCagtegory/>}/>
      
    </Routes>

    <Footer/>
    </BrowserRouter>
    </AuthContext.Provider>
 
  );
}

export default App;
