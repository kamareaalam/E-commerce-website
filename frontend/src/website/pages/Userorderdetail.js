import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/website/orderdetails/${orderId}`);
        const result = await response.json();
        setOrder(result.order || result);
      } catch (error) {
        alert("Error fetching order details: " + error.message);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) return <p className="container py-4">Order not found.</p>;

  return (
    <div className="container py-4">
      {/* Order Summary Box */}
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <h4 className="fw-bold mb-3">Order Summary</h4>
        <div className="row">
          <div className="col-md-6">
            <p><strong>Order ID:</strong> {order.orderId || order._id}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${order.status === "Delivered"
                ? "bg-success"
                : order.status === "Cancelled"
                  ? "bg-danger"
                  : "bg-warning text-dark"
                }`}>
                {order.status || "Pending"}
              </span>
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
            <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </div>

      <h5 className="fw-bold mb-3">Items in this Order</h5>
      {order.items?.map((item, index) => (
        <div key={index} className="bg-white rounded shadow-sm p-3 mb-3">
          <div className="row align-items-center">
            <div className="col-md-2 col-4 text-center">
              <img
                src={item.photo}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxHeight: "150px", objectFit: "contain", backgroundColor: "#f8f8f8" }}
              />
            </div>
            <div className="col-md-10 col-8">
              <h6 className="fw-bold mb-1">{item.name}</h6>
              <p className="mb-1">Price: ₹{item.price}</p>
              <p className="mb-0">Quantity: {item.quantity || item.qty}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrderDetails;
