import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { MdDeliveryDining } from "react-icons/md";
import Swal from "sweetalert2";
const ManageOrder = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/website/order/list");
      const result = await response.json();
      setOrders(result.data || []);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Deliver order
  const deliverOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this order as Delivered?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/website/order/deliver/${orderId}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
            }
          );

          const result = await response.json();

          if (response.ok) {
            Swal.fire("Success!", "Payment Successful & Order Delivered!", "success");
            getOrders(); 
          } else {
            Swal.fire("Error!", result.message, "error");
          }
        } catch (error) {
          Swal.fire("Error!", error.message, "error");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Payment Cancelled", "info");
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Orders</h2>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark text-center">
                <tr>
                  <th>S NO</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Mobile NO</th>
                  <th>Delivery Date</th>
                  <th>Order Status</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  [...orders].reverse().map((order, index) => (
                    <tr className="text-center" key={order._id || order.orderId || index}>
                      <td>{index + 1}</td>
                      <td>{order.orderId || order._id}</td>
                      <td>{order.address?.name}</td>
                      <td>{order.address?.mobileno}</td>
                      <td>{moment(order.deliveryDate || order.createdAt).format('YYYY-MM-DD')}</td>
                      <td>
                        <span
                          className={`badge 
                           ${order.status === "Delivered"
                              ? "bg-primary"
                              : order.status === "Cancelled"
                                ? "bg-danger"
                                : order.status === "Confirmed"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                            }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td>
                      <td>{order.payment?.paymentMethod || "-"}</td>
                      <td>{order.payment?.paymentStatus || "-"}</td>
                      <td>₹{order.payment?.amount?.toFixed(2) || order.totalAmount}</td>
                      <td>
                        <button className="btn btn-info me-2">
                          <i className="fa-solid fa-eye"></i> View
                        </button>
                        {order.status !== "Delivered" && (
                          <button
                            className="btn btn-info me-2"
                            onClick={() => deliverOrder(order._id)}
                          >
                            <MdDeliveryDining /> Deliver
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrder;
