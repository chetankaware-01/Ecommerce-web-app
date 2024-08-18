import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProduct } from "../service/ProductService";


export default function Front(){
	const navigate = useNavigate();
	const[category, setCategroy] =useState();
	const [myData, setMyData] = useState([]);
	function loadData(){
		axios.get("http://localhost:8080/home/view-categories")
		.then(Response=>{
			// console.log(Response);
			// setData(Response.data);
			setCategroy(Response.data);
			// console.log(data);
		}).catch(e=>{console.log(e)});
	}

	const getData = () => {
		getAllProduct().then((Response) => {
			console.log(Response);
			// return console.log(Response.data);
			// console.log(Response.data);
			setMyData(Response.data);
			// return console.log(myData);

		}).catch(e => {
			return e;
		})
	}


	


	function handleCategory(id){
		// console.log(id);
		navigate(`/category/${id}`);
	}

	useEffect(()=>{
		loadData();
		getData();
	},[]);


    return(
        <section>
		{/* <!-- Start Slider  --> */}


		<div id="carouselExample" className="carousel slide mt-5">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="ecom1.png" class="d-block w-100 img-fluid" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="ecom2.png" class="d-block w-100 img-fluid" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="ecom3.png" class="d-block w-100 img-fluid" alt="..."/>
    </div>
	<div className="carousel-item">
      <img src="ecom4.png" class="d-block w-100 img-fluid" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

		{/* <div id="carouselExample" className="carousel slide mt-5" data-ride="carousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img src="ecom1.png" className="d-block w-100" alt="..."
						height="350px"/>
				</div>
				<div className="carousel-item">
					<img src="ecom2.png" className="d-block w-100" alt="..."
						height="350px"/>
				</div>
				<div className="carousel-item">
					<img src="ecom3.png" className="d-block w-100" alt="..."
						height="350px"/>
				</div>
				<div className="carousel-item">
					<img src="ecom4.png" className="d-block w-100" alt="..."
						height="350px"/>
				</div>
			</div>
			<button className="carousel-control-prev" type="button"
				data-bs-target="#carouselExample" data-bs-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Previous</span>
			</button>
			<button className="carousel-control-next" type="button"
				data-bs-target="#carouselExample" data-bs-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="visually-hidden">Next</span>
			</button>
		</div> */}
{/* 
		<!-- End Slider  --> */}
{/* 
		<!--< Start Category Module --> */}
		<div className="container mt-3">
			<div className="row">
				<p className="text-center fs-4">Category</p>

				{category&&category.map((e)=>{
					
					return <div key={e.id}
					className="col-md-2 ">
						
					<div
						className="rounded-circle ">
							
						<div className="card-body text-center" onClick={()=>handleCategory(e.name)} style={{cursor: "pointer"}}>
							<img src={`http://localhost:8080/home/${e.imageName}`} className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>{e.name}</p>
						</div>
					</div>
				</div>
				})}
				
				{/* <div className="col-md-2 ">
					<div
						className="rounded-circle"> */}
                            {/* card rounded-circle shadow-sm p-3 mb-5 bg-body-tertiary rounded  */}
						{/* <div className="card-body text-center">
						
							<img src="category_img/clothes.png" className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>Clothes</p>
						</div>
					</div>
				</div> */}
				

				{/* <div className="col-md-2 rounded-circle">
					<div
						className="rounded-circle ">
						<div className="card-body text-center">
							<img src="category_img/sneakes.png" className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>Sneakers</p>
						</div>
					</div>
				</div> */}


				{/* <div className="col-md-2">
					<div
						className="rounded-cicle">
						<div className="card-body text-center">
							<img src="category_img/electronic1.png" className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>Electronics</p>
						</div>
					</div>
				</div> */}

				{/* <div className="col-md-2">
					<div
						className="rounded-circle ">
						<div className="card-body text-center">
							<img src="category_img/homedecor.png" className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>Home Decor</p>
						</div>
					</div>
				</div> */}


				{/* <div className="col-md-2 ">
					<div
						className="rounded-circle">
						<div className="card-body text-center">
							<img src="category_img/books.png"  className="rounded-circle border img-fluid" width="100%" height="200px"/>
							<p>Books</p>
						</div>
					</div>
				</div> */}

				{/* <div className="col-md-2 ">
					<div
						className="rounded-circle ">
						<div className="card-body text-center ">
							<img src="category_img/grocery.png" className="rounded-circle border img-fluid" width="100%"
								height="200px"/>
							<p>Grocery</p>
						</div>
					</div>
				</div> */}


			</div>
		</div>
		{/* <!-- End Category Module -->


		<!-- Start Latest Product Module --> */}

		<div className="container-fluid  p-3">
			<div className="row">
				<p className="text-center fs-4">Latest Product</p>
				{myData&&myData.map((e, index)=>{
					index = index+1;
					// if(index === 12){
					// 	console.log('stop');
					// }
					// console.log(index);
					return <>
					<div className="col-md-3">
					<div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
						<div className="card-body text-center" onClick={() => navigate(`/products/${e.id}`)} style={{cursor :"pointer"}}>
							<img alt="" src={`http://localhost:8080/home/${e.image}`} className="img-fluid" width="65%"
								height="140px"/>
							<p className="text-center">{e.title}</p>
						</div>
					</div>
				</div>
				</>
				})}
				


				{/* <div className="col-md-3">
					<div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
						<div className="card-body text-center">
							<img alt="" src="product_img/laptop.jpg" className="" width="65%"
								height="140px"/>
							<p className="text-center">HP Laptop</p>
						</div>
					</div>
				</div>

				<div className="col-md-3">
					<div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
						<div className="card-body text-center">
							<img alt="" src="product_img/laptop.jpg" className="" width="65%"
								height="140px"/>
							<p className="text-center">HP Laptop</p>
						</div>
					</div>
				</div> */}

				{/* <div className="col-md-3">
					<div className="card shadow-sm p-3 mb-5 bg-body-tertiary rounded">
						<div className="card-body text-center">
							<img alt="" src="product_img/laptop.jpg" className="" width="65%"
								height="140px"/>
							<p className="text-center">HP Laptop</p>
						</div>
					</div>
				</div> */}

			</div>
		</div>


		{/* <!-- End Latest Product Module --> */}
	</section>
    );
}