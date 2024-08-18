import axios from 'axios'
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from '../Context/AuthContext';

export default function LoginPage() {
	const logimg = document.getElementById("loginimg");
	const location = useLocation();
	const [history, setHistory] = useState("");
	const [adminLogin, setAdminLogin] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const userLogin = { username, password };
	const [error, setError]= useState('');
	// console.log(location);
	const { login, setLogin, token, setToken, admin, setAdmin} = useContext(AuthContext);
	// const {token , setToken} = useContext()

	const[loading, setLoading] = useState(false);


	
	const navigate = useNavigate();
	function handleSubmit(e) {
		e.preventDefault();

		setLoading(true);
		console.log("clicked");
		console.log(userLogin);
		// toast
		// login authentication
		axios.post("http://localhost:8080/api/v1/login", userLogin).then((res) => {
			console.log(res);
			sessionStorage.setItem('authToken', res.data[0].accessToken);
			
			let check = sessionStorage.getItem('authToken');
			setToken(true);
			// window.location.refresh();
			if(sessionStorage.getItem('authToken') && res.data[1]!=null){
				console.log('Admin Login');
				alert("Admin Login SucessFully !!");
				setAdminLogin(true);
				setAdmin(true);
				
				navigate("/home");
				setLogin(check);
				setToken(check);

			}

			else if(check!=null){
				// console.log("Login Success");
				setError("login Successfull")
				alert("Log in SucessFully !!");
				navigate("/home");
				setLogin(check);
				
			}
			
			// console.log(login);


			// Storing token
			// sessionStorage.setItem('jwtToken', token);

			// Retrieving token
			// const token = sessionStorage.getItem('jwtToken');

			// Removing token
			// sessionStorage.removeItem('jwtToken');
		}).catch(e => { 
			setError(" Bad Creadentials !! Try again")
			console.log(e) 
		}).finally (()=>{
			setLoading(false);  // Set loading to false when the API call completes
		  });
	}

	// function handleChange(e){
	// 	e.target.value
	// }




	// console.log(location&&location.state.data);
	useEffect(() => {
		document.title = "Login";
		if (location.state && location.state) {
			// history=location.state.data;
			setHistory(location.state.data);

		}
	}, []);

	return (
		<section>

			<div className="container mt-5 p-5">
				<div className="row">
					<div className="col-md-6 p-5">
						<img alt="" src="login.png" className="img-fluid" id="loginimg" width="100%" height="400px" />
					</div>
					<div className="col-md-6 mt-3 p-5">
						<h2 className="text-center text-success" >{history}</h2>
						<h2 className="text-center text-danger" >{error}</h2>
						<div className="card shadow p-3 mb-5 rounded" style={{ backgroundColor: "#F4EFE9", color: "#AD7030" }}>
							<div className="card-header">
								<p className="fs-4 text-center">Login</p>
								{/* <div th:if="${param.error}"
								class="alert alert-danger text-center">

								<th:block
									th:if="${session.SPRING_SECURITY_LAST_EXCEPTION!=null}">
									[[${session.SPRING_SECURITY_LAST_EXCEPTION.message}]]
								</th:block>



							</div> */}

								{/* <div th:if="${param.logout}" class="alert alert-success">
								Logout Sucessfully</div> */}
							</div>{loading? <div className="card-body text-center" ><h1>Please Wait....</h1></div>
							:

							<div className="card-body">
							<form
								// action="/login"
								method="post">
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input className="form-control" name="username" onChange={(e) => { setUsername(e.target.value) }} value={username} type="email" />
								</div>

								<div className="mb-3">
									<label className="form-label">Password</label>
									<input className="form-control" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" />
								</div>
								<button type="submit"
									className="btn text-white col-md-12" style={{ backgroundColor: "#AD7030", color: "" }} onClick={handleSubmit}>Login</button>
							</form>
						</div>


							}
							
							<div className="card-footer text-center">
								<a href="/forgot-password" className="text-decoration-none" style={{ color: "rgb(93, 63, 63)" }} >Forgot Password</a><br />
								Don't have an account ? <a href="/register" className="text-decoration-none" style={{ color: "rgb(93, 63, 63)" }}>Create
									one </a>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
	);
}