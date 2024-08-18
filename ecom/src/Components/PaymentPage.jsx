import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment(){

	const [cartData, setCartData] =useState([]);
	const[userData, setUserData] = useState([]);
	const[total, setTotal]= useState();
	const navigate = useNavigate();
	const[user , setUser] = useState({
		firstName:"",lastName:"", mobileNo:"",
		email:"", address:"", city:"",state:"",pincode:"",paymentType:""
		

	});
	

	// const[prderRequest, setOrderRequest]=useState({
	//  firstName:'',lastName:'', email:'', mobileNo:'',address:'', city:'', state:'',pincode:'',paymentType:''	
	// });
	const[formError, setFormError]=useState({
		firstName:'',lastName:'', mobileNo:"",email:"",address:"",city:"", state:"",pincode:"", paymentType:''
});
	const[address, setAddress]= useState();



    function ChangeAddress(e){
        e.preventDefault();
		const name = userData.name.split(" ");
		setUser({...user, firstName:name[0]});
		if(name.length===2){
			 setUser({...user, lastName:name[1]});
		}

		// console.log(name.length);
	

		setUser({...user, email:userData.email});
		// setUser({...user, mobileNo:userData.mobileNumber});
		// setUser({...user, address:userData.address});
		// setUser({...user, city:userData.city});
		// setUser({...user, state:userData.state});
		// setUser({...user, pincode:userData.pincode});


	

    }

	function hanldeOrder(e){
		e.preventDefault();
		
		const addToCart =async ()=>{
				await axios.post("http://localhost:8080/user/save-order",
					user
				,{
					headers: {
						'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
						// 'Conten-type': 'application/json'
					}
					// withCredentials: true 
					
				}).then((response)=>{
					console.log(response)
				   alert("order Successfully Placed !");
					// setCartData(response.data);
					navigate("/home");
					// console.log([cartCount].length);
				}).catch(e=>{console.log(e);})
			}
			if(validateForm()){
				addToCart();
			}

			
			
	}




	useEffect(()=>{
		axios.get("http://localhost:8080/user/view-cart",{
			headers :{
				Authorization:`Bearer ${sessionStorage.getItem('authToken')}`
			}
		}).then((response)=>{
			console.log(response.data);
			console.log(response.data[0].user);
			

			setUserData(response.data[0].user);
			const lastindex = response.data.length-1;
			setTotal(response.data[lastindex].totalOrderPrice);
			const name = userData.name;
			// console.log(name);
			console.log(response.data[lastindex].totalOrderPrice);

			
			// setCartData(response.data);
			// console.log(response.data.length)
			// const lastindex = response.data.length-1;
			// setTotal(response.data[lastindex].totalOrderPrice);
			// response.data.totalOrderPrice
		}).catch(e=>{console.log(e);})


	},[]);




	function validateForm(){
		const errorCopy = {...formError};

		let flag=true;
		if(user.firstName.trim()){
			errorCopy.firstName='';
		}else{
			errorCopy.firstName="Please Enter First Name !";
			flag=false;
		}
		if(user.lastName.trim()){
			errorCopy.lastName='';
		}else{
			errorCopy.lastName="Please Enter Last Name !";
			flag=false;
		}
		if(user.mobileNo.trim()){
			errorCopy.mobileNo='';
		}else{
			errorCopy.mobileNo="Please Enter Mobile number !";
			flag=false;
		}
		if(user.email.trim()){
			errorCopy.email='';
		}else{
			errorCopy.email="Please Enter Mobile Email !";
			flag=false;
		}
		if(user.address.trim()){
			errorCopy.address='';
		}else{
			errorCopy.address="Please Enter Address !";
			flag=false;
		}
		if(user.city.trim()){
			errorCopy.city='';
		}else{
			errorCopy.city="Please Enter city name !";
			flag=false;
		}
		if(user.state.trim()){
			errorCopy.state='';
		}else{
			errorCopy.state="Please Enter State !";
			flag=false;
		}
		if(user.pincode.trim()){
			errorCopy.pincode='';
		}else{
			errorCopy.pincode="Please Enter pincode !";
			flag=false;
		}
		
		
			// console.log(flag);
			setFormError(errorCopy);
			return flag;
	
	}

	function handleOnChange(e){
		let name=e.target.name;
		let value=e.target.value;
		setUser({...user,[name]:value})
		console.log(user);
	}

    return(
        <section>

		<div class="container mt-5 p-5">
			<form action="/user/save-order" method="post" id="orders" novalidate>
				<div class="row">

					<div class="col-md-6">


						<div class="mb-3 row">
							<p class="text-center fs-4">Billing Address</p>
							<hr/>
							<div class="col p-1">
								<label>First Name</label>
								 <input type="text" name="firstName" required
									class="form-control mt-1"onChange={handleOnChange} value={user.firstName}/>
									<div className="text-danger">{formError.firstName}</div>
							</div>
							<div class="col p-1">
								<label>Last Name</label> 
								<input type="text" name="lastName" required
									class="form-control mt-1"onChange={handleOnChange} value={user.lastName}/>
									<div className="text-danger">{formError.lastName}</div>
							</div>
						</div>

						<div class="mb-3 row">
							<div class="col p-1">
								<label>Email</label> 
								<input type="email" name="email" required
									class="form-control col"onChange={handleOnChange} value={user.email}/>
									<div className="text-danger">{formError.email}</div>
							</div>
							<div class="col p-1">
								<label>Mobile Number</label> <input type="text" name="mobileNo" required
									class="form-control col ms-2"onChange={handleOnChange} value={user.mobileNo}/>
									<div className="text-danger">{formError.mobileNo}</div>
							</div>
						</div>

						<div class="mb-3 row">
							<div class="col p-1">
								<label>Address</label> <input type="text" name="address" required
									class="form-control col"onChange={handleOnChange} value={user.address}/>
									<div className="text-danger">{formError.address}</div>
							</div>
							<div class="col p-1">
								<label>City</label> <input type="text" name="city" required
									class="form-control col ms-2"onChange={handleOnChange} value={user.city}/>
									<div className="text-danger">{formError.city}</div>
							</div>
						</div>
						<div class="mb-3 row">
							<div class="col p-1">
								<label>State</label> <input type="text" name="state" required
									class="form-control col"onChange={handleOnChange} value={user.state}/>
									<div className="text-danger">{formError.state}</div>
							</div>
							<div class="col p-1">
								<label>Pincode</label> <input type="number" name="pincode" required
									class="form-control col ms-2"onChange={handleOnChange} value={user.pincode}/>
									<div className="text-danger">{formError.pincode}</div>
									
							</div>

                            
						</div>
						{/* <!-- </form> --> */}
                       
                        <button class="btn bg-secondary  text-white col-md-6" onClick={ChangeAddress}>Add Saved Details</button>
                                   

					</div>
					<div class="col-md-6">
						<p class="text-center fs-4">Payment Type</p>
						<hr/>
						<div class="card">
							<div class="card-body">
								<table class="table table-borderless">
									<tbody>
										<tr>
											<td>Total price</td>
											<td>:</td>
											<td>&#8377;
                                                 {/* [[${orderPrice}]] */}
                                                 {total}
                                                 </td>
										</tr>
										<tr>
											<td>Delivery Fee</td>
											<td>:</td>
											<td>&#8377; 250</td>
										</tr>

										<tr>
											<td>Tax</td>
											<td>:</td>
											<td>&#8377; 100</td>
										</tr>

										<tr class="border-top">
											<td>Total Price</td>
											<td>:</td>
											<td>&#8377; 
                                                {/* [[${totalOrderPrice}]] */}
                                                {total+250+100}
                                                </td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="card shadow p-3 mb-5 mt-2 bg-body-tertiary rounded">

							<div class="card-body">
								{/* <!-- <form action="/login" method="post"> --> */}
								<div class="mb-3">
									<label class="form-label" >Select Payment Type</label> <select required
										name="paymentType" class="form-control" onChange={handleOnChange}>
										<option value="">{user.paymentType?'':'Please Select Paymet Type'}</option>
										<option value="">--select--</option>
										<option value="COD">Cash On Delivery</option>
										{/* <option value="ONLINE">Online Payment</option> */}
									</select>

								</div>

								<button class="btn bg-primary text-white col-md-12" onClick={hanldeOrder}>Place
									Order</button>

							</div>
						</div>
					</div>

				</div>
			</form>
		</div>

	</section>

    );
}


export default Payment;