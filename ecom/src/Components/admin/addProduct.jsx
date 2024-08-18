import axios from "axios";
import React, { useEffect, useState } from "react";


export default function AddProduct() {

const [product , setProduct ] =useState({
	title:'', description:'', category:'',price:'', isActive:'true', stock:'',discount:'' ,discountPrice:''
});
const[categoryInfo, setCategoryInfo]= useState([]);
const[active, setActive] = useState('active');
const[img, setImg] = useState();
const[formError, setFormError]=useState({
	title:'', description:'', category:'',price:'', isActive:'', stock:'', 
});

function handleActive(e){
	// active?setActive(false):setActive(true);
	console.log(e.target.value);
	e.target.value ? setActive(true) : setActive(false);
	// setProduct(...product,{isActive:e.target.value})

}

function handleFile(e){
	setImg(e.target.files[0]);
	// console.log(e.target.files[0]);
}

function handleClick(e){

	
	const name = e.target.name;
	const value = e.target.value;


	if(value==='false'){
		setActive('Inactive');
	}else{
		setActive('active');
	}
	setProduct({...product,[name]:value});

}

// console.log(product);



function validateForm(){
	const errorCopy = {...formError};

	let flag=true;
	if(product.title.trim()){
		errorCopy.title='';
	}else{
		errorCopy.title="Please Enter Title !";
		flag=false;
	}
	if(product.description.trim()){
		errorCopy.description='';
	}else{
		errorCopy.description="Please Enter Description !";
		flag=false;
	}
	if(product.category.trim()){
		errorCopy.category='';
	}else{
		errorCopy.category="Please Enter Category!";
		flag=false;
	}
	if(product.price.trim()){
		errorCopy.price='';
	}else{
		errorCopy.price="Please Enter Price !";
		flag=false;
	}
	if(product.stock.trim()){
		errorCopy.stock='';
	}else{
		errorCopy.stock="Please Enter Stock !";
		flag=false;
	}
	
	
	
	
		// console.log(flag);
		setFormError(errorCopy);
		return flag;

	
	


}



function handleSubmit(event){
	event.preventDefault();
	
	validateForm();
	
	if(validateForm()){
	const formData = new FormData();
	
	formData.append('title', product.title);
	formData.append('description', product.description);
	formData.append('category', product.category);
	formData.append('price', product.price);
	formData.append('isActive', product.isActive);
	formData.append('stock', product.stock);
	formData.append('discount', product.discount);
	formData.append('discountPrice', product.discountPrice);

	
		formData.append('file',img);
	
	

	
	// saveUser(formData);

	axios.post('http://localhost:8080/admin/add-product',formData, {
		headers :{
			Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
		}
	}).then((Response)=>{
		alert("Product Added Successfully !!");
		console.log(Response);
		setProduct(...product);
		console.log(product);

		// axios.post('http://localhost:8080/admin/add-product',formData, {
		// 	headers :{
		// 		Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
		// 	}
		// }).then((Response)=>{
		// 	console.log(Response);
		// setRes(Response.data);
		// console.log(res);
		// if(Response.data=="Added !"){
		// 	// setTransfer("User Added Successfully");
		// 	navigate('/login',{state:{data:transfer}});
		// }
		
		// setRes(Response.data);
	}).catch(e=>{console.log(e);})
	}
}


useEffect(()=>{


	

	axios.get("http://localhost:8080/home/view-categories").then((response)=>{
		console.log(response.data);
		setCategoryInfo(response.data);
	})
	.catch(e=>{console.log(e);});

},[]);

    return(
        <section>
		<div className="container p-5 mt-3">
			<div className="row">
				<div className="col-md-6 offset-md-3" >
					<div className="card card-sh" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header text-center " >
							<p className="fs-4">Add Product</p>

							{/* <th:block th:if="${session.succMsg}">
								<p className="text-success fw-bold">[[${session.succMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block>

							<th:block th:if="${session.errorMsg}">
								<p className="text-danger fw-bold">[[${session.errorMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block> */}

						</div>
						<div className="card-body">
							<form action="" method="post"
								encType="multipart/form-data">
								<div className="mb-3">
									<label>Enter Title</label> <input type="text" name="title" onChange={handleClick}
										className="form-control"/>
										<p className="text-danger">{formError.title}</p>
								</div>

								<div className="mb-3">
									<label>Enter Description</label>
									<textarea rows="3" cols="" className="form-control" onChange={handleClick}
										name="description"></textarea>
										<p className="text-danger">{formError.description}</p>
								</div>

								<div className="mb-3">
									<label>Category</label>
									 <select className="form-control" name="category" onChange={handleClick}>
									 <option className="text-danger">{formError.category}</option>

										<option>--select--</option>
										
										{categoryInfo.map((e)=>{
											
											return <option key={e.id}>
														{e.name}
												</option>


										})}
										<option
                                        //  th:each="c:${categories}"
                                         >
                                            {/* [[${c.name}]] */}
                                            </option>

									</select>
								</div>

								<div className="mb-3">
									<label>Enter Price</label> <input type="number" name="price" onChange={handleClick}
										className="form-control"/>
										<p className="text-danger">{formError.price}</p>
								</div>
									<div className="row">
								<div className="mb-3 col-6 ">
									<label>Discount</label> <input type="number" name="discount" onChange={handleClick}
										className="form-control"/>
										<p className="text-danger">{formError.price}</p>
								</div>
								<div className="mb-1 col-6 ">
									<label>Discounted Price</label> <input type="number" name="discountPrice" onChange={handleClick}
										className="form-control"/>
										<p className="text-danger">{formError.price}</p>
								</div>
								</div>
								<div className="mb-3">
									<label>Status</label>

									<div className="form-check">
										<input className="form-check-input" type="radio" onClick={handleClick} checked={active === 'active'}
											value="true" name="isActive" id="flexRadioDefault1"/>
										<label className="form-check-label" for="flexRadioDefault1">
											Active </label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="radio" onClick={handleClick} name="isActive" checked={active === 'Inactive'}
											value="false" id="flexRadioDefault2"/> <label
											className="form-check-label" for="flexRadioDefault2">
											Inactive </label>
									</div>

								</div>
								<div className="row">

									<div className="mb-3 col">
										<label>Enter Stock</label> <input type="text" name="stock" onChange={handleClick}
											className="form-control"/>
											<p className="text-danger">{formError.stock}</p>
									</div>
									

									<div className="mb-3 col">
										<label>Upload Image</label> <input type="file" name="file" onChange={handleFile}
											className="form-control"/>
									</div>
								</div>
								<button className="btn col-md-12 text-white" style={{backgroundColor : "#AD7030", color:""} } onClick={handleSubmit}>Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    );
}