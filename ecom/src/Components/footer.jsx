export default function Footer() {
    return (
        <section className="playfair-display"  style={{marginTop:"100px"}}>
  {/* <!-- Footer --> */}
  <footer className="bg-body-tertiary text-center">
    {/* <!-- Grid container --> */}
    <div className="container p-4" style={{backgroundColor:"rgb(206, 181, 181)"}}>
      {/* <!--Grid row--> */}
      <div className="row">
        {/* <!--Grid column--> */}
        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase">Ecommerce Website</h5>

          <p>
          full-stack e-commerce project built using Spring Boot, MySQL, and React.js. 
          It handles various operations on the server side, such as managing the shopping cart and other functionalities.
          </p>
        </div>
        {/* <!--Grid column-->

        <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase">Facebook</h5>

          <ul className="list-unstyled mb-0">
            <li>
              <a href="#!" className="text-body"></a>
            </li>
           
            
          </ul>
        </div>
        {/* <!--Grid column-->

        <!--Grid column--> */}
        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-0">Instagram</h5>

          <ul className="list-unstyled">
            <li>
              <a href="#!" className="text-body"></a>
            </li>
            
          </ul>
        </div>
        {/* <!--Grid column--> */}
      </div>
      {/* <!--Grid row--> */}
    </div>
    {/* <!-- Grid container --> */}

    {/* <!-- Copyright --> */}
    <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.05)"}}>
      © 2024 Copyright:
      <a className="text-body" href="">Developed and Designed by Chetan Kaware</a>
    </div>
    {/* <!-- Copyright --> */}
  </footer>
  {/* <!-- Footer --> */}
</section>

    );

}