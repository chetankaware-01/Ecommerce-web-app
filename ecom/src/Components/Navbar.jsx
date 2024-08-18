import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from '../Context/AuthContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
// import { faSolid , faUser} from '@awesome.me/kit-KIT_CODE/icons/classic/solid'
// import {FontAwesomeIcon} from ''
import axios from 'axios';
function Navbar(){

    const location = useLocation();
    const [userCheck, setUserCheck] = useState();
    const[userName, setUserName] = useState();
    // const{countCart, setCountCart} = useState();

    const navigate = useNavigate();
    const[category, setCategory] = useState([
        
    
// {id: 1, name: 'Home Decor', imageName: '6472347.png', isActive: true},

// {id: 2, name: 'Electronics', imageName: '1180247-200.png', isActive: true},

// {id: 41, name: 'Cloths', imageName: 'defult.jpg', isActive: null},
 
// {id: 43, name: 'new one ', imageName: 'PASS.jpeg', isActive: null}
    ]);
    // console.log(userCheck);
    const{token, setToken, admin , setAdmin,cartCount, setCartCount,countCart, setCountCart} = useContext(AuthContext);
    const [adminCheck, setAdminCheck]=useState(false);
    const [refresh , setRefresh] = useState();

    // const getCategoryProduct =(data)=>{
    //     axios.get("http://localhost:8080/home/products/" + data)
    //     .then((response)=>{console.log(response)})
    //     .catch(e=>{console.log(e)})
    // }


 
    // console.log(location.state.data);
    // console.log(location.search);
    
    
    function handleLogout(e){
        e.preventDefault();
        alert("Log Out Successfully !")
        sessionStorage.removeItem('authToken');
        // userCheck=null;
        setToken(null);
        setUserCheck(null);
        setAdmin(null);
        navigate("/home");
        // setAdminCheck(true);

    }


    
    useEffect(()=>{

        //Get cart Count
         if(sessionStorage.getItem('authToken')){
            axios.get("http://localhost:8080/user/cart-count",{
                headers :{
                    Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
                }
            }).then((response)=>{
                // console.log(response.data.length)
                setCartCount(response.data);
                // setCartCount(response.data);
                // console.log([cartCount].length);
            }).catch(e=>{console.log(e);})
         }   
         
        // alert("Logout SuccessFull");
        // console.log(token); 
        if(sessionStorage.getItem('authToken')){
            setUserCheck(sessionStorage.getItem('authToken'));
            }
    
            // window.location.reload();

            // if(location.state && location.state){
            //     if(location.state.data ===true){
            //         setAdminCheck(false);
            //     }
                
            // }
            //make admin and cart count global 
        console.log(admin);
        if(admin===true){
            sessionStorage.setItem('admin', true);
            setAdmin(sessionStorage.getItem('admin'));
        }
        if(sessionStorage.getItem('admin')===true){
            setAdmin(true);
        }

        axios.get("http://localhost:8080/home/view-categories").then((response)=>{
            // console.log(response.data);
            setCategory(response.data);
        })
        .catch(e=>{console.log(e);});




    },[userCheck,token,cartCount]);
    

    // sessionStorage.removeItem('authToken');

    return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark" style={{backgroundColor: "#F4EFE9", color:"#7F6049",}} >
            <div className="container-fluid" style={{color:"#7F6049"}}>
                <Link className="navbar-brand" to="/">
                    <i className="fa-solid fa-cart-shopping" style={{color:"#7F6049"}}></i>Ecommerce Store</Link>
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse "  id="navbarSupportedContent">
                    {/* <div style={{margin:"auto"}}> */}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0  ">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">
                                <i className="fa-solid fa-house mr-10"></i>
                                    Home
                            </Link>
                                </li>
                        <li className="nav-item mr-10"><Link className="nav-link active"
                            aria-current="page" to="/products">
                                Product 
                                </Link></li>

                        <li className="nav-item dropdown"><a
                            className="nav-link dropdown-toggle" href="#" role="button"
                            data-bs-toggle="dropdown" style={{color :"#805324"}} aria-expanded="true"> Category </a>
                            <ul className="dropdown-menu">
                                {/* <li th:each="c:${categorys}"><a className="dropdown-item"
                                    th:href="@{'/products?category='+${c.name}}">[[${c.name}]]</a></li> */}
                                {/* {category.map((e)=>{<li>{e.name}</li>})} */}
                                
                                 {category&&category.map((e)=>{return <li>
                                    <Link className="dropdown-item" to={`/category/${e.name}`}>{e.name}</Link></li>})}
                            </ul></li>

                        </ul>
                    {/* </div> */}
                                
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {/* If USer is log in then */}
                        {/* <th:block th:if="${user==null}"> */}
                        {userCheck?
                        <>
                             <li className="nav-item"><Link className="nav-link active"
                                aria-current="page" to="/user-cart"><i
                                    className="faSolid faCartShopping"></i> Cart 
                                    {/* [ [[${countCart}]] ] */}
                                    [{cartCount}]
                                        {/* <h1>{cartCount}</h1> */}
                                    </Link></li>

                            <li className="nav-item dropdown"><Link
                                className="nav-link dropdown-toggle active" to="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"> <i
                                    className="faSolid faUser"></i> {userName}
                            </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/my-order">My Order</Link></li>
                                    <li><hr className="dropdown-divider"/></li>

                                </ul></li>
                                {admin? <li className="nav-item"><Link className="nav-link active"
                                aria-current="page" to="/admin">Admin</Link></li>:""}

                            <li className="nav-item">
                               <i ClassName="fa-solid fa-right-to-bracket">
                                        
                                        </i> 
                                         <button className='' style={{border:'0px',backgroundColor:'#AD7030', borderRadius:'5px' ,color:'#F4EFE9', marginTop:'6px'}} onClick={handleLogout}>
                                            Logout</button>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                                            </li>


                        </>
                        
                        :
                        <>
                        <li className="nav-item"><Link className="nav-link active"
                                aria-current="page" to="/signin"><i
                                    className="fa-solid fa-right-to-bracket"></i>Login</Link></li>
                            <li className="nav-item"><Link className="nav-link active"
                                aria-current="page" to="/register">Register</Link></li>
                                
                           
                                </>
                        }                        
                            
                        {/* </th:block> */}

                        {/* <th:block th:if="${user!=null}">
                            <li className="nav-item"><a className="nav-link active"
                                aria-current="page" href="/user/cart"><i
                                    className="fa-solid fa-cart-shopping"></i> Cart [ [[${countCart}]] ]</a></li>

                            <li className="nav-item dropdown"><a
                                className="nav-link dropdown-toggle active" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"> <i
                                    className="fa-solid fa-user"></i> [[${user.name}]]
                            </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><hr className="dropdown-divider"/></li>

                                </ul></li>

                            <li className="nav-item"><a className="nav-link active"
                                aria-current="page" href="/logout"><i
                                    className="fa-solid fa-right-to-bracket"></i> Logout</a></li>
                        </th:block> */}

                    </ul>
                     

                </div>
            </div>
        </nav>

    );
}

export default Navbar;	