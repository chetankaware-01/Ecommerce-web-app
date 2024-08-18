import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) =>{
    const  [token, setToken] = useState('UnsetToken');
 
    return(
        
        // <AuthContext.Provider value={{token, setToken}}>
        //     {props.children}
        <h1>hi</h1>
        // </AuthContext.Provider>
    );
}

export default AuthState;