import {React,useState} from "react";
import { saveUser } from "../service/UserService";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Register(){

	const navigate = useNavigate();
	// const history = useHistory();
		const[res, setRes]=useState("");
		const[transfer, setTransfer]=useState("User Added Successfully");
	const register = {login:"User Registration SuccessFull!!"};
	const[user , setUser] = useState({
		name : "", mobileNumber:"",
		email : "", address:"", city:"",state:"",pincode:"",password:"", cpassword:""
		

	});

	const[file,setFile]=useState('');
	const[formError, setFormError]=useState({
				Name:"", mobileNumber:"",email:"",address:"",city:"", state:"",pincode:"",password:"",cpassword:""
	});



	function validateForm(){
		const errorCopy = {...formError};

		let flag=true;
		if(user.name.trim()){
			errorCopy.Name='';
		}else{
			errorCopy.Name="Please Enter Name !";
			flag=false;
		}
		if(user.mobileNumber.trim()){
			errorCopy.mobileNumber='';
		}else{
			errorCopy.mobileNumber="Please Enter Mobile number !";
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
		if(user.password.trim()){
			errorCopy.password='';
		}else{
			errorCopy.password="Please Enter Password!";
			flag=false;
		}
		if(user.cpassword.trim()){
			errorCopy.cpassword='';
		}else{
			errorCopy.cpassword="Please Enter passoword";
			flag=false;
		}

		if(flag==true){
			if(user.password !== user.cpassword){
				errorCopy.password="";
				errorCopy.cpassword="password and confirm password in not matched !";
				setFormError(errorCopy);
				flag=false;
				console.log(flag);
				return flag;

			}
			
		}
		
			// console.log(flag);
			setFormError(errorCopy);
			return flag;
	
		
		


	}


	function handleSubmit(event){
		event.preventDefault();
		
		
		// formData.append('user' , user);
		if(validateForm()){
		const formData = new FormData();
		
		formData.append('name', user.name);
		formData.append('mobileNumber', user.mobileNumber);
		formData.append('email', user.email);
		formData.append('address', user.address);
		formData.append('city', user.city);
		formData.append('state', user.state);
		formData.append('pincode', user.pincode);
		formData.append('password', user.password);
		formData.append('cpassword', user.cpassword);
		
			formData.append('img',file);
		
		

		
		// saveUser(formData);

		axios.post('http://localhost:8080/home/saveUser',formData).then((Response)=>{
			console.log(Response);
			setRes(Response.data);
			// console.log(res);
			if(Response.data=="Added !"){
				// setTransfer("User Added Successfully");
				navigate('/login',{state:{data:transfer}});
			}
			
			// setRes(Response.data);
		}).catch(e=>{console.log(e);})
		

		// saveUser(user,file);
		// console.log("Sucess");
		// console.log(user);

		// .then((response) => {
		// 	console.log(response.data);
		// })
		// .catch((e)=>{
		// 	console.log(e);
		// })
		
		}
		
	}
	let aname="";
	let value=""
	function handleField(e){
		
		aname=e.target.name;
		value=e.target.value;
		// console.log(e.target.file);
		
		// setFile(e.target.files[0]);
		// console.log(e.target.files[0]);
		setUser({...user,[aname]:value})
		

	}
	function handleImg(e){
		setFile(e.target.files[0]);
	}


    return(
        <section>
			<img src="user.img" alt=""/>
		<div className="container mt-5 p-5">
			
			<div className="row">
				<div className="col-md-5 p-5">
					<img alt="" src="register.png"  className="img-fluid" width="100%" height="400px"/>
				</div>
				<div className="col-md-7 p-2">
					<div className="card shadow p-3 mb-5 rounded" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header text-center">
						<div className="text-danger"><h1>{res}</h1></div>
							<p className="fs-4 text-center" style={{color:"rgb(93, 63, 63)"}}>Register</p>
							{/* <th:block th:if="${session.succMsg}">
								<p className="text-success fw-bold">
                                    [[${session.succMsg}]]
                                    </p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block>

							<th:block th:if="${session.errorMsg}">
								<p className="text-danger fw-bold">[[${session.errorMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block> */}
						</div>
						<div className="card-body">
							<form 
							// action="/login"
							// /saveUser 
							encType="multipart/form-data"
								
								method="post">
								<div className="row">
									<div className="col">
										
										<label className="form-label">Full Name</label> <input required
											className="form-control" onChange= {handleField} name="name" value={user.name} type="text"/>
											<div className="text-danger">{formError.Name}</div>
									</div>

									<div className="col">
										<label className="form-label">Mobile Number</label> <input
											required className="form-control" onChange={handleField} name="mobileNumber" value={user.mobileNumber}
											type="number"/>
											<div className="text-danger">{formError.mobileNumber}</div>
									</div>

								</div>

								<div className="mb-3">
									<label className="form-label">Email</label> <input required
										className="form-control" onChange={handleField} name="email" value={user.email} type="email"/>
										<div className="text-danger">{formError.email}</div>
								</div>


								<div className="row">
									<div className="col">
										<label className="form-label">Address</label> <input required
											className="form-control" onChange={handleField} name="address" value={user.address} type="text"/>
											<div className="text-danger">{formError.address}</div>
									</div>

									<div className="col">
										<label className="form-label">City</label> <input required
											className="form-control" onChange={handleField} name="city" value={user.city} type="text"/>
											<div className="text-danger">{formError.city}</div>
									</div>

								</div>

								<div className="row mt-2"  >
									<div className="col">
										<label className="form-label">State</label> <input required
											className="form-control" onChange={handleField} name="state" value={user.state} type="text"/>
											<div className="text-danger">{formError.state}</div>
									</div>

									<div className="col mt-2">
										<label className="form-label">Pincode</label> <input required
											className="form-control" onChange={handleField} name="pincode" value={user.pincode} type="number"/>
											<div className="text-danger">{formError.pincode}</div>
									</div>

								</div>


								<div className="row">
									<div className="col">
										<label className="form-label">Password</label> <input required
											className="form-control" onChange={handleField} name="password" value={user.password} type="password"/>
											<div className="text-danger">{formError.password}</div>
									</div>

									<div className="col">
										<label className="form-label">Confirm Password</label> <input
											required className="form-control" onChange={handleField} name="cpassword" value={user.cpassword}
											type="password"/>
											<div className="text-danger">{formError.cpassword}</div>
									</div>


								</div>



								<div className="mb-3 mt-2">
									<label className="form-label">Profile Image</label> <input type="file"
										className="form-control" style={{color:"rgb(93, 63, 63)"}} onChange={handleImg} name="img" value={user.img}/>
								</div>






								<button type="submit" onClick={handleSubmit}
									className="btn text-white col-md-12" style={{backgroundColor : "#AD7030", color:""}}>Register</button>
							</form>
						</div>

						<div className="card-footer text-center">

							have an account ? <a href="/login" className="text-decoration-none" style={{color:"rgb(93, 63, 63)"}}>Login
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
    );
}