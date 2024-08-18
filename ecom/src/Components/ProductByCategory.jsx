import React, { useEffect, useState } from "react";
import { getAllProduct } from "../service/ProductService";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function ProductByCagtegory() {

	const {id} = useParams();
	const[category, setCategory]=useState();
	const navigate = useNavigate();
	const [myData, setMyData] = useState([]);
	const getData = () => {
		getAllProduct().then((Response) => {
			// console.log(Response);
			// return console.log(Response.data);
			// console.log(Response.data);
			setMyData(Response.data);
			// return console.log(myData);

		}).catch(e => {
			return e;
		})
	}

	function handleCategory(data){
		console.log(data);
		axios.get("http://localhost:8080/home/products/"+data)
		.then((response)=>{
			// console.log(response.data);
			setMyData(response.data);
		})

	}


	function handleAll(){
		// getAllProduct();
		getData();
		// console.log("all clicked");
	}

	useEffect(() => { 
		// getData(); 

		// console.log(id);
			
			axios.get("http://localhost:8080/home/products/"+id)
			.then((response)=>{
			// console.log(response.data);
			setMyData(response.data);
		})
		
		


		axios.get("http://localhost:8080/home/view-categories").then((response)=>{
            // console.log(response.data);
            setCategory(response.data);
        })
        .catch(e=>{console.log(e);});
	}, [id]);

	return (
		<section>

			<div className="container-fluid p-5 mt-5 " style={{ backgroundColor: "rgb(206, 181, 181)" }}>
				<div className="row">
					<div className="col-md-8 offset-md-2">
						<form>
							<div className="input-group">
								<input type="text" className="form-control" name="ch" />
								<button className="btn ms-3 col-md-2" style={{ backgroundColor: "#F4EFE9", color: "rgb(93, 63, 63)" }}>
									<i className="fa-solid fa-magnifying-glass"></i> Search
								</button>
							</div>
						</form>
					</div>
				</div>

			</div>


			<div className="container-fluid mt-1">
				<div className="row">

					<div className="col-md-2 p-0">

						<div className="card shadow-sm p-0 mb-5 rounded" style={{ backgroundColor: "#f4efe9" }}>
							<div className="card-body">
								<div className="list-group">
									<p className="fs-5">Category</p>
									<Link 
										// th:classNameappend="${paramValue==''} ? 'active':''"
										className="list-group-item list-group-item-action"
										aria-current="true" onClick={handleAll}> All </Link>
										{category&&category.map((e)=>{
											return <Link
											// th:each="c:${categories}"
											// th:href="@{'/products?category='+${c.name}}"
											// th:classNameappend="${paramValue == c.name} ? 'active':''"
											className="list-group-item list-group-item-action "  aria-current="true" onClick={()=>handleCategory(e.name)}>
										{/* [[${c.name}]] */}
										{e.name}
										 
											
									</Link>
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-10">
						<div className="card shadow-sm p-3 mb-5 rounded" style={{ backgroundColor: "#f4efe9" }}>
							<div className="card-body">
								<p className="fs-3 text-center">Products</p>
								<div className="row">
									{/* <th:block th:if="${products.size >0}"> */}
									{myData.map((d) => {
											const title = d.title;
											// return <div key={d.id}>{title}</div>
											return <div className="col-md-3" key={d.id} >
													
										 <div className="card mt-4" >
					 							<div className="card-body ">
												<img alt=""
													// th:src="@{'/img/product_img/'+${p.image}}"
													src={`http://localhost:8080/home/${d.image}`}
													width="100%" height="150px" />
												<p className="fs-5 text-center">
													{/* [[${p.title}]] */}
													{d.title}
												</p>
												<div className="row text-center">
													<p className="fs-6 fw-bold ">
														<span>&#8377;
															{/* [[${p.discountPrice}]] */}
															{d.discountPrice}
														</span> <br /> <span
															className="text-decoration-line-through text-secondary">&#8377;
															{/* [[${p.price}]] */}
															{d.price}
														</span> <span className="fs-6 text-success">
															{/* [[${p.discount}]]% */}{d.discount}
															%off </span>
													</p>
													{/* <a th:href="@{'/product/'+${p.id}}" */}
													<button className="btn col-md-6 offset-md-3" style={{ backgroundColor: "#AD7030", color: "white" }} onClick={() => navigate(`/products/${d.id}`)}>View
														Details</button>
												</div>
											</div>											
										</div>
										
									</div>

								})}
									{/* </th:block>
								<th:block th:unless="${products.size>0}">
								<p className="fs-4 text-center mt-4 text-danger">Product not available</p>
								</th:block> */}
								</div>

							</div>
						</div>

					</div>
				</div>
			</div>

		</section>

	);

}