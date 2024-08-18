
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductByID } from '../service/ProductService';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

export default function ViewProduct() {

	const { id } = useParams();
	const navigate = useNavigate();

	const [productData, setProductData] = useState([]);
	const[addtocart, SetAddtoCart] =useState();
	const{countCart, setCountCart} = useContext(AuthContext);
	// productD.title="";

	 

	function handleCart(e) {
		e.preventDefault();

		// const addToCart =async ()=>{
		// 	await axios.get("http://localhost:8080/user/add-cart/2",{
		// 		// headers :{
		// 		// 	Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
					
		// 		// }
		// 		headers: {
		// 			'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
		// 			'Content-Type': 'application/json'
		// 		},
		// 		withCredentials: true 
				
		// 	}).then((response)=>{
		// 		console.log(response.data)
			   
		// 		// setCartCount(response.data);
		// 		// console.log([cartCount].length);
		// 	}).catch(e=>{console.log(e);})
		// }
		// addToCart();

		
		if (sessionStorage.getItem('authToken')) {
			console.log("user login");
			//db to add into cart 
			// const userid = 
			const token = sessionStorage.getItem('authToken');
			console.log(token);
			axios.get('http://localhost:8080/user/add-cart/'+id, {
				headers :{
					Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
					'Content-Type': 'application/json'
				},
				withCredentials: true 
				
			}).then((response)=>{
				console.log(response);
			}).catch(e=>console.log(e))
			SetAddtoCart("Product added to cart");
			setCountCart(countCart+1);
			// setCountCart(1);
		} else {
			// console.log("please log in");
			// alert("Please log in");
			// navigate()
			// if the ok button is clicked, result will be true (boolean)
			const result = window.confirm("Please login to Proceed further !");

			if (result) {
				// the user clicked ok
				// console.log("ok cliked")
				navigate("/login");
			} else {
				// the user clicked cancel or closed the confirm dialog.
				console.log("cancel clicked");
			}
			

		}

	}



	useEffect(() => {
		getProductByID(id).then((R) => {
			// console.log(R);
			setProductData(R.data);
			// console.log(R.data);
			// console.log(productData);
		})
	}, [id])

	// useEffect(()=>{
	// 	function data (id){
	// 		 getProductByID(id).then((Res)=>{
	// 			// if(Res.data){
	// 				setProductData(Res.data);
	// 				// pdata.category=productData.category;
	// 				console.log(Res);
	// 				console.log(pdata);


	// 	}).catch(e=>{
	// 		console.log(e);
	// 	})}

	// 	// const fetchData = async () => {
	// 	// 	try {
	// 	// 	  const response = await axios.get('https://localhost:8080/home/product/' +id);
	// 	// 	  setProductData(response.data);
	// 	// 	  // Any function you want to call after data is fetched
	// 	// 	//   handleDataProcessing(response.data);
	// 	// 	console.log(response);
	// 	// 	} catch (error) {
	// 	// 	  console.log(error);
	// 	// 	} finally {
	// 	// 	  console.log(false);
	// 	// 	}
	// 	//   };

	// 	//   fetchData();

	// 	// getProductData(id);

	// 	// getProduc(tByID(id).then((res)=>{

	// 	// 	console.log(res);
	// 	// }).catch((e)=>{
	// 	// 	console.log(e);
	// 	// })
	// },[]);

	// function getProductData(id){
	// 	// console.log(id);
	// 	getProductByID(id).then((Res)=>{
	// 		// console.log(Res);
	// 		setProductData(Res.data);
	// 	}).catch(e=>{console.log(e);})
	// }

	// function getFullName(item) {
	// 	console.log(item.title);
	// 	console.log(item.id);
	// 	return [item.title,item.description].join(" ");
	//   }

	return (
		<section>
			<div className="container card-sh"
				style={{ marginTop: "70px", marginBottom: "100px" }}>
				{productData && [productData].map((p) => {
					return <div className="col-md-12 p-5">
						<div className="row">
							{addtocart? <p className="text-success alert alert-success text-center" >{addtocart}</p> :""}
							
							{/* <th:block th:if="${session.succMsg}">
						<p className="text-success alert alert-success text-center" role="alert">[[${session.succMsg}]]</p>
						<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
					</th:block>

					<th:block th:if="${session.errorMsg}">
						<p className="text-danger text-center  alert alert-danger">[[${session.errorMsg}]]</p>
						<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>

					</th:block> */}




							{/* { [productData].map(getFullName)} */}

							<div key={p.id} className="col-md-6 text-end">
								<img  src={`http://localhost:8080/home/${p.image}`} className="img-fluid" width="330px"
									height="400px" />

							</div>

							<div className="col-md-6">

								<p className="fs-3">
									{/* [[${product.title}]] */}

									{/* {`if(productData.title==null){
									productData.title="";
								}`} */}
									{p.title}
									{/* {productData&&productData.title} */}

								</p>
								<p>
									<span className="fw-bold">Description : </span><br />
									{/* [[${product.description}]] */}
									{/* {productData&&productData.description} */}
									{/* Product Description */}
									{p.description}
								</p>
								<p>
									<span className="fw-bold"> Product Details: </span> <br /> Status:

									{/* {productData&&productData.isActive} */}
									{p.isActive}

									{/* <th:block th:if="${product.stock>0}">
								<span className="badge bg-success">Available</span>
							</th:block>

							<th:block th:unless="${product.stock>0}">
								<span className="badge bg-warning">out of stock</span>
							</th:block> */}


									<br /> Category:
									{/* [[${product.category}]] */}
									{p.category}
									{/* {productData&&productData.category} */}
									<br /> Policy : 7
									Days Replacement & Return
								</p>
								<p className="fs-5 fw-bold">
									Price :&nbsp; &nbsp; &nbsp; &nbsp;<i className="fas fa-rupee-sign"></i>
									{/* [[${product.discountPrice}]]  */}
									{p.discountPrice}
									<span
										className="fs-6 text-decoration-line-through text-secondary">
										{/* [[${product.price}]] */}
										{/* {productData&&productData} */}
										{p.price}
									</span>
									<span className="fs-6  text-success">
										{/* [[${product.discount}]] */}
										{/* {productData&&productData.discount} */}
										{p.discount}
										% off</span>
								</p>
							</div>

							<div className="row">
								<div className="col-md-4 text-success text-center p-2">
									<i className="fas fa-money-bill-wave fa-2x"></i>
									<p>Cash On Delivery</p>
								</div>
								<div className="col-md-4 text-danger text-center p-2">
									<i className="fas fa-undo-alt fa-2x"></i>
									<p>Return Available</p>
								</div>
								<div className="col-md-4 text-primary text-center p-2">
									<i className="fas fa-truck-moving fa-2x"></i>
									<p>Free Shipping</p>
								</div>
							</div>






							{/* <th:block th:if="${product.stock>0}">
							<th:block th:if="${user==null}">
								<a href="/signin" className="btn btn-danger col-md-12">Add To
									Cart</a>
							</th:block>

							

							<th:block th:unless="${user==null}">
								<a
									th:href="@{'/user/addCart?pid='+${product.id}+'&uid='+${user.id}}"
									className="btn btn-danger col-md-12">Add To Cart</a>
							</th:block>

						</th:block>

						<th:block th:unless="${product.stock>0}">
							<a href="#" className="btn text-white btn-warning col-md-12">Out
								of Stock</a>
						</th:block> */}


							<button type="button" className="btn btn-success btn-lg btn-block" onClick={handleCart}>Add to Cart</button>



						</div>

					</div>
				})}
			</div>


		</section>
	);
}