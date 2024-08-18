export default function Users() {
    return(
        <section>
		<div className="container-fluid mt-5 p-5">

			<div className="card card-sh">
				<div className="card-header text-center">
					<p className="fs-4">Users</p>
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
								<th scope="col">Profile</th>
								<th scope="col">Name</th>
								<th scope="col">Email</th>
								<th scope="col">Mobile No</th>
								<th scope="col">Address</th>
								<th scope="col">Status</th>
								<th scope="col">Action</th>
							</tr>
						</thead>
						<tbody>
                            <tr>
							{/* <tr th:each="u,c:${users}">
								<th scope="row">[[${c.count}]]</th>
								<td><img th:src="@{'/img/profile_img/'+${u.profileImage}}"
									width="70px" height="70px"></td>
								<td>[[${u.name}]]</td>
								<td>[[${u.email}]]</td>
								<td>[[${u.mobileNumber}]]</td>
								<td>[[${u.address+','+u.city+','+u.state+','+u.pincode}]]</td>
								<td>[[${u.isEnable}]]</td> */}
								<td><a 
                                // th:href="@{'/admin/updateSts?status=true&id='+${u.id}}"
									className="btn btn-sm btn-primary">Active</a> 
										
									<a
									// th:href="@{'/admin/updateSts?status=false&id='+${u.id}}"
									className="btn btn-sm btn-danger">
										Inactive</a></td>
							</tr>

						</tbody>
					</table>
				</div>
			</div>
		</div>

	</section>
    );
}