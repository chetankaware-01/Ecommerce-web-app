import React from "react";  

export default function ResetPass(){

    return(
        <section>

		<div className="container mt-5 p-5">
			<div className="row">
				<div className="col-md-6 p-5">
					<img alt="" src="ecom.png" className="img-fluid" width="100%" height="400px"/>
				</div>
				<div className="col-md-6 mt-3 p-5">
					<div className="card shadow p-3 mb-5 rounded" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header">
							<p className="fs-4 text-center">Reset Password</p>
							{/* <th:block th:if="${session.succMsg}">
								<p className="text-success fw-bold text-center">[[${session.succMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block>

							<th:block th:if="${session.errorMsg}">
								<p className="text-danger fw-bold text-center">[[${session.errorMsg}]]</p>
								<th:block th:text="${@commnServiceImpl.removeSessionMessage()}"></th:block>
							</th:block> */}
						</div>
						<div className="card-body">
							<form action="/reset-password" method="post">
								<div className="mb-3">
									<label className="form-label">New Password</label> <input
										className="form-control" name="password" type="password"/>
								</div>

								<div className="mb-3">
									<label className="form-label">Confirm Password</label> 
                                    <input className="form-control" type="password"/>
								</div>
								<input type="hidden"
                                //  th:value="${token}" 
                                 name="token"/>
								<button type="submit"
									className="btn text-white col-md-12" style={{backgroundColor : "#AD7030", color:""}}>Reset
									Password</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
    );

}