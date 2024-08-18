import axios, { AxiosHeaders } from "axios";
import React, { useEffect, useState } from "react";

function Profile(){

    // const [user, setUser] =useState({name:'', mobileNumber:'', email:'',address:'', state:'', city:'', pincode:'', password:'', cpassword:'', img:'' , oldpassword:''});
      const [user, setUser] = useState('');
      // const[data, setData] =useState({});
      // State to manage editing
      const[test, setTest] = useState(false);
      const[changepass, setChangePass] =useState();
 
    const token = sessionStorage.getItem('authToken');



  function handlerequest(e){
    e.preventDefault();
    

  }


  function handleUpdate(e){
        e.preventDefault();
        console.log("handleUpdate");

        setTest(true);
        console.log(test);
  }


  function handlePasswordUpdate(e){
    e.preventDefault();
    setChangePass(true);
  }
  


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };





const apiUrl = 'http://localhost:8080/user/profile';  // Replace with your API endpoint
const jwtToken = sessionStorage.getItem('authToken');  // Replace with your actual JWT token
// const AuthAxios= async() => axios.create({
//   baseURL:"http://localhost:8080/user/profile",
//   headers:{
//         Authorization : `Bearer ${token}`
//   }
// });


  useEffect(()=>{
  
    // const response =  AuthAxios;
    // console.log(response);
   
    // fetch(apiUrl, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${jwtToken}`,  // Include the JWT in the Authorization header
    //     'Content-Type': 'application/json'       // Optionally set the Content-Type header
    //   }
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json();  // Parse the response as JSON
    // })
    // .then(data => {
    //   console.log('Data:', data);  // Handle the data from the response
    // })
    // .catch(error => {
    //   console.error('There was an error!', error);  // Handle errors
    // });
    





    // AuthAxios('').then(f=>console.log(f));
     axios.get("http://localhost:8080/user/profile",{
        headers: {
          // Authorization: `Bearer ${token}`,
          // Accept: `*/*`,
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
          // 'Content-Type': 'application/json'
          // , Creadentials : 'true'
        }
      })
    .then((response)=>{
      // console.log(response)
      // console.log(response.data.city);
      setUser(response.data);
      // console.log(response.data);
      // console.log(user);




    })
    .catch(e=>{console.log(e)});
    // console.log(token);
    // const result = async()=> await AuthAxios.get().then(r=>{console.log(r)}).catch(e=>console.log(e));


    // AuthAxios.get("").then(r=>{console.log(r)}).catch(e=>console.log(e));
  },[])


    return(
        <section>
			<img src="user.img" alt=""/>
		<div className="container mt-5 p-5">
			
			<div className="row">
				<div className="col-md-5 p-5">
					<img alt="" src="register.png"  className="img-fluid rounded-circle border" />
				</div>
				<div className="col-md-7 p-2">
					<div className="card shadow p-3 mb-5 rounded" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header text-center">
						
							<p className="fs-4 text-center" style={{color:"rgb(93, 63, 63)"}}>"Profile Details"</p>
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
										
										<label className="form-label">
                                            Full Name
                                            </label>
                                            {test?
                                            <input required	className="form-control"  onChange={handleChange} name="name" value={user.name} type="text"/>
                                             :
                                         <input required	className="form-control" readOnly="true" name="name" value={user.name} type="text"/>
                                        }
									</div>

									<div className="col">
										<label className="form-label">Mobile Number</label> 
                                        {test?
                                        <input
                                        required className="form-control" onChange={handleChange} name="mobileNumber" value={user.mobileNumber}
                                        type="number"/>
                                        
                                        :<input
											required className="form-control" readOnly="true" name="mobileNumber" value={user.mobileNumber}
											type="number"/>}
                                        
											
									</div>

								</div>

								<div className="mb-3">
									<label className="form-label">Email</label> 

                                    {test?
                                    <input required
                                    className="form-control"  name="email" onChange={handleChange} value={user.email} type="email"/>
                                    :
                                    <input required
                                    className="form-control"  name="email" readOnly="true" value={user.email} type="email"/>}
                                    
										
								</div>


								<div className="row">
									<div className="col">
										<label className="form-label">Address</label>
                                        {test?
                                        <input required
                                        className="form-control"  name="address" onChange={handleChange} value={user.address} type="text"/>
                                        :
                                        <input required
											className="form-control"  name="address" readOnly="true" value={user.address} type="text"/>
                                        } 
									</div>

									<div className="col">
										<label className="form-label">City</label>
                                        {test?
                                        <input required
                                        className="form-control"  name="city" onChange={handleChange} value={user.city} type="text"/>
                                        :
                                        <input required
											className="form-control"  name="city" readOnly="true" value={user.city} type="text"/>
                                        } 
									</div>

								</div>

								<div className="row mt-2"  >
									<div className="col">
										<label className="form-label">State</label>
                                        {test?
                                            <input required
											className="form-control"  name="state" onChange={handleChange} value={user.state} type="text"/>
                                        : 
                                        <input required
											className="form-control"  readOnly="true" name="state" value={user.state} type="text"/>
                                        }
									</div>

									<div className="col mt-2">
										<label className="form-label">Pincode</label> 
                                        {test?
                                        <input required
                                        className="form-control"  name="pincode" onChange={handleChange} value={user.pincode} type="number"/>
                                        :
                                        <input required
											className="form-control"  name="pincode" value={user.pincode} type="number"/>
                                        }
									</div>

								</div>
                                <button 
									className="btn text-white col-md-5" style={{backgroundColor : "#AD7030", color:""}} onClick={(e)=>{handlePasswordUpdate(e)}}>Update Passoword</button>
                                {changepass?<>
								<div className="row">

                                
                                <div className="col">
                                
										<label className="form-label">Old Password</label>
                                         <input required
											className="form-control"  name="oldpassword" onChange={handleChange} value={user.oldpassword} type="password"/>
											
									</div>
									<div className="col">
										<label className="form-label">Password</label>
                                         <input required
											className="form-control"  name="password" onChange={handleChange} value={user.password} type="password"/>
											
									</div>

									<div className="col">
										<label className="form-label">Confirm Password</label> 
                                        <input
											required className="form-control" name="cpassword" onChange={handleChange} value={user.cpassword}
											type="password"/>
											
									</div>
                                   

								</div>
                                 </>
                                :""}



								<div className="mb-3 mt-2">
                                {test?<>
                                <label className="form-label">Profile Image</label> <input type="file"
										className="form-control" style={{color:"rgb(93, 63, 63)"}}  name="img" value={user.img}/>
								</>
                                
                                :
                                ""
                                }
                                </div>
									


                                {test?
                                <>
                                    {changepass?""
                                    
                                    :
                                    
                                    <div className="col mb-3">
										<label className="form-label">Password</label>
                                         <input required
											className="form-control"  name="password" onChange={handleChange} value={user.password} type="password"/>
											
									</div>
                                    
                                    }
                                    
                                <button	className="btn text-white col-md-12" 
                                style={{backgroundColor : "#AD7030", color:""}} onClick={(e)=>{handlerequest(e)}}>Update </button>
                                
                                </>
                                :
								<button 
									className="btn text-white col-md-12" style={{backgroundColor : "#AD7030", color:""}} onClick={(e)=>{handleUpdate(e)}}>Click Here to update Details</button>

                                    }

                                



							</form>
						</div>

						
					</div>
				</div>
			</div>
		</div>

	</section>
    );
}

export default Profile;