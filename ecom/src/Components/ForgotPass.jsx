import React from "react";


export default function ForgotPass(){
    return(
        <section>

		<div className="container mt-5 p-5">
			<div className="row">
				<div className="col-md-6 p-5">
					<img alt="" src="ecom.png" width="100%" height="400px"/>
				</div>
				<div className="col-md-6 mt-3 p-5">
					<div className="card shadow p-3 mb-5 rounded" style={{backgroundColor : "#F4EFE9" , color:"#AD7030"}}>
						<div className="card-header">
							<p className="fs-4 text-center">Forgot Password</p>

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
							<form action="/forgot-password" method="post">
								<div className="mb-3">
									<label className="form-label">Email</label> 
                                    <input
										className="form-control" name="email" type="email"
										placeholder="Enter your email "/>
								</div>
								<div className="text-center">
									<button type="submit" className="btn text-white" style={{backgroundColor : "#AD7030", color:""}}>Send</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>

	</section>
    );
}