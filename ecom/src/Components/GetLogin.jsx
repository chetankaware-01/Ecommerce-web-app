// src/components/Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthState from '../Context/AuthState';
import AuthContext from '../Context/AuthContext';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const user = { username, password };




    const[category, setCategory] = useState([
        
 
        {id: 1, name: 'Home Decor', imageName: '6472347.png', isActive: true},
    
        {id: 2, name: 'Electronics', imageName: '1180247-200.png', isActive: true},
    
        {id: 41, name: 'Cloths', imageName: 'defult.jpg', isActive: null},
     
        {id: 43, name: 'new one ', imageName: 'PASS.jpeg', isActive: null}
        ]);
    const handleSubmit = (e) => {
        e.preventDefault();
        // axios.post("http://localhost:8080/auth/login",new URLSearchParams({
        //                "username": username,
        //                "password": password}),{
        //                 headers: {
        //                 'Content-Type': 'application/x-www-form-urlencoded'
        //                              },
        //                                withCredentials: true 
        //                             }
        //                 ).then(Response=>{console.log(Response);})
        //                 .catch(e=>{console.log(e)});
        axios.post("http://localhost:8080/api/v1/login", user).then(Res => { console.log(Res) }).catch(e => { console.log(e) })


    }
    //Context
    const { login, setLogin } = useContext(AuthContext);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://localhost:8080/login', new URLSearchParams({
    //             "username": username,
    //             "password": password
    //         }), {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded'
    //             },
    //             withCredentials: true // Important to send cookies with the request
    //         }).then(Response=>{
    //             console.log(Response);
    //             console.log(Response.data);
    //         });
    //         console.log("login Success");
    //         // onLogin(response.data);

    //     } catch (error) {
    //         console.error("Login Failed:", error);
    //     }
    // };

    return (
        <>

            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>



            <div>

            

            {category.map((e)=>{return <h1>{e.name}</h1>})}
            </div>
            <form onSubmit={handleSubmit} style={{ marginTop: "90px" }}>
                <label>
                    <button onClick={() => { setLogin("Login is set") }}>click me to set Login</button>
                    {/* {login} */}
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Login</button>
            </form>
            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* <!-- Modal --> */}
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
