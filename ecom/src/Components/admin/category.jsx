import { useEffect, useState } from "react";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";


export default function Category() {


	const[catdata, setCatData] = useState({name:"",isActive:"true"});
	const[data, setData] =useState([]);
	const[file,setFile]=useState('');
	const [selectedStatus, setSelectedStatus] = useState('active');
	const [addcategorystatus , setAddCategoryStatus]=useState('');
	const navigate = useNavigate();
	

	function handleClick(e){
		let aname=e.target.name;
		let value=e.target.value;
		// console.log(e.target.file);
		if(value==='false'){
			setSelectedStatus('Inactive');
		}else{
			setSelectedStatus('active');
		}
		// setFile(e.target.files[0]);
		// console.log(e.target.files[0]);
		setCatData({...catdata,[aname]:value});
		// console.log(catdata);
	}
	function handleFile(e){
			// setFile(e.target.files);
			// console.log(e.target.files[0]);
			setFile(e.target.files[0]);
	}


	function handleEdit(id){

	}



	function handleSubmit(event){
		event.preventDefault();
			
			
			// formData.append('user' , user);
			
			const formData = new FormData();
			
			formData.append('name', catdata.name);
			formData.append('isActive', catdata.isActive);
			
				formData.append('file',file);
				// console.log(file);
			
		

		// saveUser(formData);

		axios.post('http://localhost:8080/admin/add-category', formData,{
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
			}
		  }).then((Response)=>{
			console.log(Response);
			if(Response.data=="successfull"){
				alert("Category Created !!");
				setAddCategoryStatus("Category Added Successfully!")
				// setAddCategoryStatus('active');
				loadData();
					
			}
			else{
				setAddCategoryStatus("");
			}
			// console.log(res);
			
			
			// setRes(Response.data);
		}).catch(e=>{console.log(e);})
	}

	function loadData(){
		axios.get("http://localhost:8080/home/view-categories",{
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
			}
		  }).then(Response=>{
			console.log(Response);
			setData(Response.data);
			console.log(data);
		}).catch(e=>{console.log(e)});
	}

//function to delete the category
	function handleDelete(id){
		axios.delete("http://localhost:8080/admin/delete-catagory/"+id,{
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
			}
		  }).then(Response=>{
			alert("Category Delete Successfully !!!")
			loadData();
			
		}).catch(e=>{console.log(e);})
	}





	useEffect(()=>{
			loadData();
	},[]);






    return(
        <section>
		<div className="container-fluid p-5 mt-5">
			
			<div className="row">
				<div className="col-md-3">
					<div className="card card-sh" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header text-center ">
							<p className="fs-4">Add Category</p>
							{/* <th:block th:if="${session.succMsg}">
								<p className="text-success fw-bold">[[${session.succMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block>

							<th:block th:if="${session.errorMsg}">
								<p className="text-danger fw-bold">[[${session.errorMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block> */}

						</div>
						<div className="card-body"  style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
							<form action="" method="post"
								encType="multipart/form-data">
								<div className="mb-3">
									<label>Enter Category</label> <input type="text" name="name"
										value={catdata.name} className="form-control" onChange={handleClick}/>
								</div>

								<div className="mb-3">
									<label>Status</label>

									<div className="form-check">
										<input className="form-check-input" type="radio" 
											value={"true"} name="isActive" id="flexRadioDefault1"  onClick={handleClick} checked={selectedStatus === 'active'} />
										<label className="form-check-label" >
											Active </label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="radio" 
											value={"false"} name="isActive" id="flexRadioDefault1"  onClick={handleClick} checked={selectedStatus === 'Inactive'}/>
										<label className="form-check-label" >
											Inactive </label>
									</div>
									

								</div>

								<div className="mb-3">
									<label>Upload Image</label> <input type="file" name="file"
										 className="form-control" onChange={handleFile}/>
								</div>
								<button className="btn col-md-12 mt-2" style={{backgroundColor:"rgb(93, 63, 63)"} } onClick={handleSubmit}>Save</button>
							</form>
						</div>
					</div>
				</div>

				<div className="col-md-8">
					<div className="card card-sh">
						<h3 className="text-center">{addcategorystatus}</h3>
						<div className="card-header text-center fs-4">Category Details</div>
						<div className="card-body">
							<table className="table">
								<thead>
									<tr>
										<th scope="col">Sl No</th>
										<th scope="col">Category</th>
										<th scope="col">Status</th>
										<th scope="col">Image</th>
										<th scope="col">Action</th>
									</tr>
								</thead>

								{data.map((element,index)=>{
									 
							 return <tbody key={element.id}>
									<tr 
                                    // th:each="cat,c:${categorys}"
                                    >
						
										<th scope="row">
                                            {/* [[${c.count}]] */}
											 {/* {element.id}  */}
											 {index+1}
											

                                        </th>
										<td>
                                            {/* [[${cat.name}]] */}
											{element.name}
                                        </td>
										<td>
                                            {/* [[${cat.isActive}]] */}
											{element.isActive?"Active":"Inactive"}
											{/* {console.log(element.isActive)} */}
                                        </td>
										<td><img
											// th:src="@{'/img/category_img/'+${cat.imageName}}"
											src={`http://localhost:8080/home/${element.imageName}`}
											width="50px" height="50px"/></td>
										<td>
											
											
											
											<button
                                        // th:href="@{'/admin/loadEditCategory/'+${cat.id}}" 
                                        className="btn btn-primary btn-sm
												fa-solid fa-pen-to-square  fa-1x " style={{marginRight:"5px"}} onClick={()=>handleEdit()}> Edit </button> 
												
											<button
											// th:href="@{'/admin/deleteCategory/'+${cat.id}}"
											className="btn btn-danger btn-sm
												fa-solid fa-trash  fa-1x " onClick={()=>handleDelete(element.id)}>Delete</button></td>
									</tr>

								</tbody>
								})}
								
							</table>
							{/* <img src="C:/Users/HP/Downloads/shoppingcart/src/main/resources/static/img/domesile.jpeg" alt=""/> */}
						</div>
					</div>

				</div>

			</div>
		</div>
	</section>
    );
}