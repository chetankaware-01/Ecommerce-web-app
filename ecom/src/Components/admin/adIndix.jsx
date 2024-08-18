import { Link } from "react-router-dom";


export default function AdminIndex() {
    return(
        <section>
		<div className="container p-5">
			<p className="text-center fs-3 mt-4">Admin Dashboard</p>
			<div className="row p-5">
				<div className="col-md-4 mt-2">
					<Link to="/admin/loadAddProduct" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center" style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-square-plus fa-3x"></i> */}
								<h4>Add Product</h4>
							</div>
						</div>
					</Link>
				</div>


				<div className="col-md-4 mt-2">
					<Link to="/admin/category" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center " style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-list fa-3x"></i> */}
								<h4>Add Category</h4>
							</div>
						</div>
					</Link>
				</div>


				<div className="col-md-4 mt-2">
					<Link to="/admin/products" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center " style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-table-list fa-3x"></i> */}
								<h4>View Product</h4>
							</div>
						</div>
					</Link>
				</div>


				<div className="col-md-4 mt-4">
					<Link to="/admin/view-orders" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center " style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-box-open fa-3x"></i> */}
								<h4>Orders</h4>
							</div>
						</div>
					</Link>
				</div>


				<div className="col-md-4 mt-4">
					<Link to="/admin/users" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center " style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-circle-user fa-3x"></i> */}
								<h4>Users</h4>
							</div>
						</div>
					</Link>
				</div>


				<div className="col-md-4 mt-4">
					<Link to="#" className="text-decoration-none">
						<div className="card card-sh">
							<div className="card-body text-center " style={{color:"rgb(93, 63, 63)"}}>
								{/* <i className="fa-solid fa-user-plus fa-3x"></i> */}
								<h4 style={{color:"rgb(93, 63, 63)"}}>Add Admin</h4>
							</div>
						</div>
					</Link>
				</div>


			</div>
		</div>
	</section>
    );

}