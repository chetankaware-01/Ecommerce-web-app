import { useState, React, useEffect} from "react";
import { getAllProduct } from "../../service/ProductService";
import axios from "axios";

export default function ProductsAdmin() {
	const [myData, setMyData] = useState([]);


	function handleEdit(id){
		console.log("edit"+id);
	}

	function handleDelete(id){
		console.log("Delete"+id);
		
		axios.delete("http://localhost:8080/admin/delete-product/"+id,{
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem('authToken')}`
			}
		  }).then(Response=>{
			console.log(Response);
			// setData(Response.data);
			// console.log(data);
		}).catch(e=>{console.log(e)});
		loadData();
	}
function loadData(){
	getAllProduct().then(Response=>{
		console.log(Response);
		setMyData(Response.data);
		// console.log(data);
	}).catch(e=>{console.log(e)});
}



	
	useEffect(()=>{

		loadData();
		
	},[]);


    return(
        <section>
		<div className="container-fluid mt-5 p-5">

			<div className="card card-sh">
				<div className="card-header text-center">
					<p className="fs-4">View Products</p>
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
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Sl No</th>
								<th scope="col">Image</th>
								<th scope="col">Title</th>
								<th scope="col">Category</th>
								<th scope="col">Price</th>
								<th scope="col">Discount</th>
								<th scope="col">Discount Price</th>
								<th scope="col">Status</th>
								<th scope="col">Stock</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>

							{myData.map((p,index)=>{
								return <tr 
								// th:each="p,c:${products}"
								key={p.id}
								>
									<th scope="row">
										{/* [[${c.count}]] */}
										{index+1}
										</th>
									<td><img 
									// th:src=
									// "@{'/img/product_img/'+${p.image}}"
									// 	width="70px" height="70px"/>
										src={`http://localhost:8080/home/${p.image}`}
										width="70px" height="70px"

									/>
										</td>
									{/* <td>[[${p.title}]]</td>
									<td>[[${p.category}]]</td>
									<td>[[${p.price}]]</td>
									<td>[[${p.discount}]]</td>
									<td>[[${p.discountPrice}]]</td>
									<td>[[${p.isActive}]]</td>
									<td>[[${p.stock}]]</td> */}

									<td>{p.title}</td>
									<td>{p.category}</td>
									<td>{p.price}</td>
									<td>{p.discount}</td>
									<td>{p.discountPrice}</td>
									<td>{p.isActive ? 'Active':'InActive'}</td>
									<td>{p.stock}</td>


									<td><button style={{marginRight:"4px"}} onClick={()=>{handleEdit(p.id)}}
									// th:href="@{'/admin/editProduct/'+${p.id}}"
										className="btn btn-sm btn-primary mr-2"><i
											className="fa-solid fa-pen-to-square"></i>Edit</button> 
											<button onClick={()=>{handleDelete(p.id)}}
										// th:href="@{'/admin/deleteProduct/'+${p.id}}"
										className="btn btn-sm btn-danger "><i className="fa-solid fa-trash ml-2"></i>
											Delete</button></td>
								</tr>
							})}
							

						</tbody>
					</table>
				</div>
			</div>
		</div>

	</section>
    );
}