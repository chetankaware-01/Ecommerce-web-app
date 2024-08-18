import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GetallOrders(){

	const[orderData, setOrderData]= useState([]);
	const[total,  setTotal] =useState([]);


	function handleRemove(e){
		e.preventDefault();

	}

	const saveData = async (data)=>{
		setOrderData(data)
	}

	async function Data(){
		const resp = await axios.get("http://localhost:8080/admin/all-orders",{
			headers :{
				Authorization:`Bearer ${sessionStorage.getItem('authToken')}`,
				
			},
			withCredentials :true,
		});
		

		console.log(resp.data);
		setOrderData(resp.data);
		console.log(orderData);
	}

const getData = async() =>{
	await axios.get("http://localhost:8080/admin/all-orders",{
			headers :{
				Authorization:`Bearer ${sessionStorage.getItem('authToken')}`,
				
			},
			withCredentials :true,
		}).
		 then((response)=>{
			console.log(response.data);

			// setCartData(response.data);
			// saveData(response.data);
            setOrderData(response.data);
			 setTotal(response.data);
			// setOrderData(response.data)
            console.log(orderData);
			console.log(total)
			// // console.log(response.data.length)
			// const lastindex = response.data.length-1;
			// setTotal(response.data[lastindex].totalOrderPrice);
			// response.data.totalOrderPrice
		}).catch(e=>{console.log(e);})
}

	useEffect(()=>{
		getData();
		// Data();
	},[]);



    return(
        
        <section>
		<div className="container-fluid mt-5 p-5" >

			<div className="card card-sh">
				<div className="card-header text-center">
					<p className="fs-4">Orders</p>
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
								<th scope="col">Order IDs</th>
								<th scope="col">User Details</th>
                                <th scope="col">Order Date</th>
								<th scope="col">Product Name</th>
								
								<th scope="col" className="text-center">Address</th>
								<th scope="col">Product Price</th>
								<th scope="col">Status</th>
                                <th scope="col">Learn More</th>
							</tr>
						</thead>
						<tbody>
							{orderData&&orderData.map((c,index)=>{
								return <>
							
							<tr 
                            // th:each="cart,c:${carts}"
							// key={c.id}
                            >
								<th scope="row">
                                    {/* [[${c.count}]] */}
									{index+1}
                                    </th>
								<td>
                                    {c.user.name}
                                </td>
								<td>
                                    {/* [[${cart.product.title}]] */}
									{c.orderDate}
								
                                    </td>
								<td>
                                    
                                    {/* [[${cart.product.discountPrice}]] */}
									{/* {c.user.name} */}
                                    {/* {c.user.mobileNumber} */}
									{c.product.title}
                                </td>
								<td className="text-center"><a
									// th:href="@{'/user/cartQuantityUpdate?sy=de&cid='+${cart.id}}"
                                    >
										{c.orderAddress.address} {c.orderAddress.state}
								</a>
                                 {/* [ [[${cart.quantity}]] ]  */}
								 {/* {c.orderDate} */}
                                 <a
									// th:href="@{'/user/cartQuantityUpdate?sy=in&cid='+${cart.id}}"
                                    >

										
										
								</a></td>
								<td>
                                    {/* [[${cart.totalPrice}]] */}
									{/* {c.product.title} */}
									{c.price}

                                </td>

                                <td>
                                    {/* [[${cart.totalPrice}]] */}
									{/* {c.orderAddress} */}
									{c.status}

                                
								
								</td>
								<td>
								<button type="button" class="btn btn-danger" onClick={handleRemove}>Details</button>
								</td>
							</tr>
							
							</>
						})}	
						<tr>
								
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