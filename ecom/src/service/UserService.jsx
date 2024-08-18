import axios from 'axios'
const userURl= "http://localhost:8080/home";


// const config = {     
//     headers: { 'content-type': 'multipart/form-data' , "type": "formData"}
// }
export const saveUser=(user)=>{
    axios.post(userURl + "/saveUser", FormData).then((Response)=>{
            console.log(Response.data);
    }).catch(e=>{
        console.log(e);
    });
}