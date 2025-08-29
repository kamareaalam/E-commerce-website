import React from "react";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  return (
    <div className="mt-5">
      <div className=" rounded shadow-lg border">
        <div className="card">
        <div className="card-body">
          <h2 className="mb-4">Return & Refund Policy</h2>
          <p>
            We want you to be completely satisfied with your purchase. If you're not happy, you can return the product within <strong>30 days</strong> of delivery.
          </p>

          <h4 className="mt-4">Eligibility for Returns</h4>
          <ul className="mb-4" style={{listStyleType: 'disc'}}>
            <li>Item must be unused and in the same condition as received.</li>
            <li>Must be in the original packaging.</li>
            <li>Proof of purchase or receipt is required.</li>
          </ul>

          <h4>Non-returnable Items</h4>
          <ul className="mb-4" style={{ listStyleType: 'disc' }}>
            <li>Gift cards</li>
            <li>Downloadable software products</li>
            <li>Health and personal care items</li>
          </ul>


          <h4>Refunds</h4>
          <p>
            Once we receive your return, we will inspect it and notify you. If approved, your refund will be processed, and a credit will automatically be applied to your original payment method within <strong>7-10 business days</strong>.
          </p>

          <h4>Late or Missing Refunds</h4>
          <p>
            If you haven’t received a refund yet, first check your bank account. Then contact your credit card company, as it may take some time before your refund is officially posted. If you’ve done all of this and still have not received your refund, please <Link to={"/Contact-us"}>Contact-Us</Link>
          </p>

            <div className="text-center mt-4">
              <button className="btn btn-danger me-2"><Link to={"/Contact-us"} style={{ textDecoration: 'none', color: 'white' }}> Contact Support </Link></button>
              <button className="btn btn-success"><Link to={"/Contact-us"} style={{textDecoration:'none', color:'white'}}>  Request a Return </Link></button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
