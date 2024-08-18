import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

export default function UserCart(){

	const[cartdata, setCartData]= useState([]);
	const[total,  setTotal] =useState();
	const{countCart, setCountCart} = useContext(AuthContext);

	function getCart(){
		axios.get("http://localhost:8080/user/view-cart",{
		headers :{
			Authorization:`Bearer ${sessionStorage.getItem('authToken')}`,
			
		},
		withCredentials :true,
	}).then((response)=>{
		// console.log(response.data);
		setCartData(response.data);
		// console.log(response.data.length)
		const lastindex = response.data.length-1;
		setTotal(response.data[lastindex].totalOrderPrice);
		// response.data.totalOrderPrice
	}).catch(e=>{console.log(e);})
}

	function handleRemove(id){
		// e.preventDefault();
		console.log(id);
		axios.get("http://localhost:8080/user/remove-cart/" +id,{
			headers :{
				Authorization:`Bearer ${sessionStorage.getItem('authToken')}`,
				
			},
			withCredentials :true,
		}).then((response)=>{
			console.log(response.data);
			alert(response.data);
			getCart();
			setCountCart(countCart-1);
			// setCartData(response.data);
			// console.log(response.data.length)
			// const lastindex = response.data.length-1;
			// setTotal(response.data[lastindex].totalOrderPrice);
			// response.data.totalOrderPrice
		}).catch(e=>{console.log(e);})
		
	}

	useEffect(()=>{
		
	getCart();
	},[]);



    return(
        
        <section>
		<div className="container-fluid mt-5 p-5" >

			<div className="card card-sh">
				<div className="card-header text-center">
					<p className="fs-4">Cart Page</p>
					{/* <th:block th:if="${session.succMsg}">
						<p className="text-success fw-bold">[[${session.succMsg}]]</p>
						<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
					</th:block>

					<th:block th:if="${session.errorMsg}">
						<p className="text-danger fw-bold">[[${session.errorMsg}]]</p>
						<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
					</th:block> */}
				</div>
				<div className="card-body"  >
					<table className="table" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<thead>
							<tr>
								<th scope="col">Sl No</th>
								<th scope="col">Image</th>
								<th scope="col">Product Name</th>
								<th scope="col">Price</th>
								<th scope="col" className="text-center">Quantity</th>
								<th scope="col">Total Price</th>
								<th scope="col">Remove</th>
							</tr>
						</thead>
						<tbody>
							{cartdata&&cartdata.map((c,index)=>{
								return <>
							
							<tr 
                            // th:each="cart,c:${carts}"
							key={c.id}
                            >
								<th scope="row">
                                    {/* [[${c.count}]] */}
									{index+1}
                                    </th>
								<td><img
									// th:src="@{'/img/product_img/'+${cart.product.image}}"
									src={`http://localhost:8080/home/${c.product.image}`}
									width="70px" height="70px"/></td>
								<td>
                                    {/* [[${cart.product.title}]] */}
									{c.product.title}
                                    </td>
								<td>
                                    
                                    {/* [[${cart.product.discountPrice}]] */}
									{c.product.discountPrice}

                                </td>
								<td className="text-center"><a
									// th:href="@{'/user/cartQuantityUpdate?sy=de&cid='+${cart.id}}"
                                    >
										<i className="fa-solid fa-minus"></i>
								</a>
                                 {/* [ [[${cart.quantity}]] ]  */}
								 {c.quantity}
                                 <a
									// th:href="@{'/user/cartQuantityUpdate?sy=in&cid='+${cart.id}}"
                                    >
										<i className="fa-solid fa-plus"></i>
								</a></td>
								<td>
                                    {/* [[${cart.totalPrice}]] */}
									{c.totalPrice}

                                </td>
								<td>
								<button type="button" class="btn btn-danger" onClick={()=>handleRemove(c.id)}>Remove</button>
								</td>
							</tr>
							
							</>
						})}	
						<tr>
								<td colspan="5"></td>
								<td className="fw-bold">Total Price</td>
								<td className="fw-bold">&#8377; 
                                    {/* [[${totalOrderPrice}]] */}
									{total}
                                    </td>
							</tr>
						</tbody>
					</table>
					<div className="text-center">
						<Link to="/checkout" className="btn btn-warning"> Proceed Payment</Link>
					</div>
				</div>
			</div>
		</div>

	</section>

    );
}