import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaRupeeSign } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import moment from 'moment';
import { Link } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";
import ReactPaginate from "react-paginate";
const Userorderlist = () => {
  const [orders, setOrders] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [showCancelForm, setShowCancelForm] = useState({});
  const [cancelReasons, setCancelReasons] = useState({});
  const [cancelSuccess, setCancelSuccess] = useState({});
  const [showReplaceForm, setShowReplaceForm] = useState({});
  const [replaceReasons, setReplaceReasons] = useState({});
  const [replaceSuccess, setReplaceSuccess] = useState({});
  const [showTrackSection, setShowTrackSection] = useState({});
  const [trackData, setTrackData] = useState({});

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

  const toggleCard = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCancelClick = (key) => {
    setShowCancelForm(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReplaceClick = (key) => {
    setShowReplaceForm(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReasonChange = (key, reason) => {
    setCancelReasons(prev => ({ ...prev, [key]: reason }));
  };

  const handleReplaceReasonChange = (key, reason) => {
    setReplaceReasons(prev => ({ ...prev, [key]: reason }));
  };

  const cancel = async (orderId, key) => {
    const reason = cancelReasons[key];
    if (!reason) return alert("Please select a reason to cancel.");

    try {
      const response = await fetch(`http://localhost:4000/api/website/order/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const result = await response.json();
      if (response.ok) {
        setCancelSuccess(prev => ({ ...prev, [key]: "Cancelled Successfully" }));
        setShowCancelForm(prev => ({ ...prev, [key]: false }));
        getOrders();
      } else {
        alert(result.message || "Failed to cancel");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const replace = async (itemId, key) => {
    const reason = replaceReasons[key];
    if (!reason) return alert("Please select a reason for replacement.");

    try {
      const response = await fetch(`http://localhost:4000/api/website/order/replace/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const result = await response.json();
      if (response.ok) {
        setReplaceSuccess(prev => ({ ...prev, [key]: "Replacement Requested" }));
        setShowReplaceForm(prev => ({ ...prev, [key]: false }));
        getOrders();
      } else {
        alert(result.message || "Failed to replace");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleTrackClick = async (itemId, key) => {
    setShowTrackSection(prev => ({ ...prev, [key]: !prev[key] }));
    if (trackData[key]) return;

    try {
      const response = await fetch(`http://localhost:4000/api/website/order/track/${itemId}`);
      const result = await response.json();
      if (response.ok) {
        setTrackData(prev => ({ ...prev, [key]: result.trackingInfo }));
      } else {
        alert("Tracking error: " + (result.message || ""));
      }
    } catch (error) {
      alert("Tracking error: " + error.message);
    }
  };

  const PER_PAGE = 3; //displays 10 items/records per page
      const [currentPage, setCurrentPage] = useState(0);
      function handlePageClick({ selected: selectedPage }) {
          setCurrentPage(selectedPage)
      }
      const offset = currentPage * PER_PAGE;
      const pageCount = Math.ceil(orders.length / PER_PAGE);

  return (
    <>
      <section className="bg-white shadow-sm py-2" style={{ position: 'sticky', top: '0', zIndex: '9999'}}>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid px-3 px-lg-4">

            <Link className="navbar-brand me-3" to="/">
              <img src={image} alt="Myntra" style={{ width: '50px', marginLeft: '50px' }} className="rounded-pill" />
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto align-items-center flex-wrap gap-5 gap-lg-6">
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/product-list?gender=Male,Boys">MEN</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/product-list?gender=Female,Girls">WOMEN</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/product-list?gender=Kids">KIDS</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5" to="/product-list?category=Beauty">BEAUTY</Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link fs-5" to="/product-list?category=Home%20Living">HOME & LIVING</Link>
                </li> */}
                <li className="nav-item d-none d-lg-block">
                  <form className="d-flex">
                    <input className="form-control" style={{ width: '700px' }} type="search" placeholder="Search for products, brands, and more" />
                  </form>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 d-flex align-items-center" to="/User-profile">
                    <i className="fa-regular fa-user me-2"></i> Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 d-flex align-items-center" to="/User-wish-list">
                    <i className="fa-regular fa-heart me-2"></i> Wishlist
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link fs-5 d-flex align-items-center" to="/User-cart">
                    <i className="fa fa-shopping-cart me-2"></i> Cart
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>

      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='mb-2' style={{marginTop:'60px'}}>
              <h5> Account</h5>
              <hr />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-2" style={{ borderRight: '1px solid black' }}>
            {/* <div className="mb-2">
              <h5 >Account</h5>
              <hr/>
            </div> */}

            <div className="mb-5">
              <h6>Overview</h6>
            </div>
            <hr />

            <div className="mb-4">
              <p>Other</p>
              <Link to="/User-order-list" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Order & Returns</h6>
              </Link>
            </div>
            <hr />

            <div className="mb-4">
              <p>CREDIT</p>
              <h6>Coupans</h6>
              <h6>Myntra Credit</h6>
              <h6>Myn Cash</h6>
            </div>
            <hr />
            <div className="mb-4">
              <p>Account</p>
              <Link to="/User-profile" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Profile</h6>
              </Link>
              <h6>Saved Cards</h6>
              <h6>Saved UPI</h6>
              <h6>Saved Wallets</h6>
              <h6>Addresses</h6>
              <h6 style={{ cursor: 'pointer' }}>Delete Account</h6>
            </div>
            <hr />

            <div className="mb-4">
              <p>LEGAL</p>
              <Link to="/Term-condition" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Terms of Use</h6>
              </Link>
              <Link to="/Return-policy" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Privacy Policy</h6>
              </Link>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-lg-10 col-md-12">
            <div className="row">
              <div className="col-lg-12">
                <div className='fw-bold fs-4'>All Orders</div>
                <div>from anytime</div>
                {/* <h1 className="text-secondary">Orders: {orders.length}</h1> */}
              </div>
            </div>

            {[...orders].slice(offset, offset + PER_PAGE).reverse().map((order, index) => (
              <div key={index} className="col-lg-10 ">
                {/* <h5 className="text-danger text-center">Order ID: {order.orderId}</h5> */}

                {order.items?.map((item, index1) => {
                  const key = `${index}-${index1}`;
                  const isExpanded = expanded[key];
                  const isCancelled = cancelSuccess[key];
                  const isCancelFormVisible = showCancelForm[key];
                  const isReplaceFormVisible = showReplaceForm[key];
                  const isReplaced = replaceSuccess[key];
                  const isTrackVisible = showTrackSection[key];

                  return (
                    <div key={index1} className={`card mb-3 position-relative ${isExpanded ? 'expanded-card' : ''}`}
                      style={{ backgroundColor: 'darkgray' }} >
                      <div className="status-box">
                        <div className="status-icon"><FiPackage size={20} /></div>
                        <div>
                          <span className="status-text">{order.status}</span>
                          <p>
                            {order.status === "Cancelled" && order.cancelledAt
                              ? `on ${moment(order.cancelledAt).format("ddd, D MMM")} as per your request`
                              : order.deliveryDate
                                ? `Arriving by ${moment(order.deliveryDate).format("ddd, D MMM")}`
                                : "Delivery date not available"}
                          </p>
                        </div>
                      </div>

                      <div className="card-body d-flex align-items-center flex-wrap transition-content">
                        <Link to={`/user-order-detail/${order._id}`} >
                          <div className="me-4">
                            <img src={item.photo || "default.jpeg"} alt={item.name} style={{ width: "100px", height: "100px", objectFit: "contain" }} />
                          </div>
                        </Link>
                        <div className="flex text-center text-md-start mt-md-0 mt-3">
                          {/* <h5 className="text-danger">{order.orderId}</h5> */}
                          <h5>{item.name}</h5>
                          <p className="mb-1 text-muted-sm">{item.description}</p>
                          {/* <p className="mb-1">Quantity: {item.quantity}</p>
                               <p className="mb-1">Price: ₹ {item.price}</p>
                               <p className="mb-1">Total: ₹ {item.price * item.quantity}</p> */}
                        </div>

                        <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }} >
                          <button className="btn btn-sm text-muted" onClick={() => toggleCard(key)}>
                            <i className="fa-solid fa-chevron-right" style={{
                              fontSize: '20px', transition: 'transform 0.3s ease',
                              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            }} >
                            </i>
                          </button>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between px-3 pb-3 flex-wrap gap-2 align-items-center">
                        {order.status === "Cancelled" ? (
                          <span className="text-danger fw-bold">Order Cancelled</span>
                        ) : order.status === "Delivered" ? (
                          <span className="text-success fw-bold">Order Delivered</span>
                        ) : (
                          <>
                            <button className="btn btn-white w-25 bg-white" onClick={() => handleCancelClick(key)}>Cancel</button>
                            <button className="btn btn-white w-25 bg-white" onClick={() => handleReplaceClick(key)}>Replace</button>
                            <button className="btn btn-white w-25 bg-white" onClick={() => handleTrackClick(item._id, key)}>
                              {isTrackVisible ? "Hide Track" : "Track"}
                            </button>
                          </>
                        )}
                      </div>

                      {isCancelFormVisible && (
                        <div className="px-3 pb-3">
                          <div className="card">
                            <div className="card-body">
                              <h3>Reason for cancellation</h3>
                              <fieldset>
                                {[
                                  "Delayed Delivery Cancellation", "Incorrect size ordered", "Duplicate Order",
                                  "Product not required anymore", "Cash Issue", "Ordered by mistake", "Wants to change style/color",
                                ].map((reason, i) => (
                                  <label key={i} className="d-block my-2">
                                    <input type="radio" className="me-2" name={`cancelReason-${key}`}
                                      onChange={() => handleReasonChange(key, reason)} />
                                    {reason}
                                  </label>
                                ))}
                              </fieldset>
                            </div>
                          </div>

                          <div className="container bg-white mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="mb-1">REFUND DETAILS</p>
                                <span className="mb-0 rup"><FaRupeeSign /> 0</span>
                              </div>
                              <button
                                className="btn btn-danger w-25 d-flex justify-content-between align-items-center"
                                onClick={() => cancel(order._id, key)} >
                                <span>Cancel</span><FaArrowRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {isReplaceFormVisible && (
                        <div className="px-3 pb-3">
                          <div className="card">
                            <div className="card-body">
                              <h3>Reason for Replacement</h3>
                              <fieldset>
                                {[
                                  "Wrong size delivered", "Damaged product", "Received different item", "Packaging issue", "Other reasons"
                                ].map((reason, i) => (
                                  <label key={i} className="d-block my-2">
                                    <input type="radio" className="me-2" name={`replaceReason-${key}`}
                                      onChange={() => handleReplaceReasonChange(key, reason)} />
                                    {reason}
                                  </label>
                                ))}
                              </fieldset>
                            </div>
                          </div>

                          <div className="container bg-white mt-3">
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <p className="mb-1">REPLACEMENT INFO</p>
                                <span className="mb-0 rup"><FaRupeeSign /> 0</span>
                              </div>
                              <button
                                className="btn btn-warning w-25 d-flex justify-content-between align-items-center"
                                onClick={() => replace(item._id, key)} >
                                <span>Replace</span><FaArrowRight />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {isTrackVisible && trackData[key] && (
                        <div className="p-3 bg-white mt-2 shadow-sm rounded">
                          <h5 className="mb-3">Tracking Status</h5>
                          <div className="d-flex align-items-center gap-3">
                            <FiPackage size={28} className="text-primary" />
                            <div>
                              <strong>{trackData[key].currentStatus}</strong>
                              <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                                Estimated Delivery: {moment(trackData[key].estimatedDelivery).format("ddd, D MMM")}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {isCancelled && <div className="alert alert-success m-3">{isCancelled}</div>}
                      {isReplaced && <div className="alert alert-warning m-3">{isReplaced}</div>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="text-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination  justify-content-center"}
              pageClassName={"page-item "}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active primary"}
            />
          </div>

        </div>
      </div>

      <footer className='bg-dark text-white pt-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-12 col-sm-3'>
              <h5>OPENING SHOPING</h5>
              <p>Men</p>
              <p>Women</p>
              <p>Kids</p>
              <p>Home</p>
              <p>Beauty</p>
            </div>

            <div className='col-12 col-sm-3'>
              <h5>CUSTOMER POLICIES</h5>
              <Link to="/Contact-us" className="text-white text-decoration-none">
                <p>Contact-Us</p>
              </Link>
              <p>FAQ</p>
              <Link to="/Term-condition" className='text-white text-decoration-none'>
                <p>Terms of Use</p>
              </Link>
              <Link to="/Return-policy" className='text-white text-decoration-none'>
                <p>Return Policy</p>
              </Link>
            </div>

            <div className='col-12 col-sm-3'>
              <h5>EXPERIENCE MYNTRA APP MOBILE</h5>
              <div className="d-flex gap-1">
                <img src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
                  alt="img" className="w-50" />
                <img src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
                  alt="img" className="w-50" />
              </div>
              <div className='pt-2'>KEEP IN TOUCH</div>
              <div className='d-flex gap-4 pt-2'>
                <div><i className='fab fa-facebook fa-2x'></i></div>
                <div><i className='fab fa-twitter fa-2x'></i></div>
                <div><i className='fab fa-instagram fa-2x'></i></div>
                <div><i className='fab fa-youtube fa-2x'></i></div>
              </div>
            </div>

            <div className="col-12 col-sm-3 d-flex flex-column gap-3">
              <div className="d-flex align-items-start gap-2">
                <img
                  src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
                  alt="original" width="50" height="50" />
                <span><b>100% ORIGINAL</b> guarantee for all products at myntra.com</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <img
                  src="https://constant.myntassets.com/web/assets/img/6c3306ca-1efa-4a27-8769-3b69d16948741574602902452-original.png"
                  alt="return" width="50" height="50" />
                <span><b>Return within 14 days</b> of receiving your order</span>
              </div>
            </div>
          </div>

          <div>
            <div className="fw-bold text-white">POPULAR SEARCH</div>
            <hr className="mt-1 mb-3 fw-bold text-white" />
            <div className='pt-3'>Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer |Blouse | Gowns | Rings | Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits | Bikini | Myntra Fashion Show | Lipstick | Saree | Watches | Dresses | Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes | Adidas Shoes | Woodland Shoes | Jewellery | Designers Sarees</div>
          </div>

          <div className="d-flex justify-content-between text-center gap-2 pt-3" >
            <Link to="/Contact-us" className="text-decoration-none text-white">
              <span>In case of any concern, </span>
              <span className="fw-bold text-primary">Contact-Us</span>
            </Link>
            <p>2025 www.myntra.com All rights reserved.</p>
            <p >A Flipkart company</p>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Userorderlist;

// {/* <div className="container">
//   <div className="row mt-3">
//     <div className="col-xl-12 text-center">
//       <h1 className="text-secondary">Orders: {orders.length}</h1>
//     </div>
//   </div>

//   {orders.map((order, index) => (
//     <div key={index} className="col-xl-8 mx-auto my-4">
//       {/* <h5 className="text-danger text-center">Order ID: {order.orderId}</h5> */}

//       {order.items?.map((item, index1) => {
//         const key = `${index}-${index1}`;
//         const isExpanded = expanded[key];
//         const isCancelled = cancelSuccess[key];
//         const isCancelFormVisible = showCancelForm[key];
//         const isReplaceFormVisible = showReplaceForm[key];
//         const isReplaced = replaceSuccess[key];
//         const isTrackVisible = showTrackSection[key];

//         return (
//           <div key={index1} className={`card mb-3 position-relative ${isExpanded ? 'expanded-card' : ''}`}
//             style={{ backgroundColor: 'darkgray' }} >
//             <div className="status-box">
//               <div className="status-icon"><FiPackage size={20} /></div>
//               <div>
//                 <span className="status-text">{order.status}</span>
//                 <p>
//                   {order.status === "Cancelled" && order.cancelledAt
//                     ? `on ${moment(order.cancelledAt).format("ddd, D MMM")} as per your request`
//                     : order.deliveryDate
//                       ? `Arriving by ${moment(order.deliveryDate).format("ddd, D MMM")}`
//                       : "Delivery date not available"}
//                 </p>
//               </div>
//             </div>

//             <div className="card-body d-flex align-items-center flex-wrap transition-content">
//               <Link to={`/user-order-detail/${order._id}`} >
//                 <div className="me-4">
//                   <img src={item.photo || "default.jpeg"} alt={item.name} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
//                 </div>
//               </Link>
//               <div className="flex text-center text-md-start mt-md-0 mt-3">
//                 {/* <h5 className="text-danger">{order.orderId}</h5> */}
//                 <h5>{item.name}</h5>
//                 <p className="mb-1 text-muted-sm">{item.description}</p>
//                 {/* <p className="mb-1">Quantity: {item.quantity}</p>
//                     <p className="mb-1">Price: ₹ {item.price}</p>
//                     <p className="mb-1">Total: ₹ {item.price * item.quantity}</p> */}
//               </div>

//               <div style={{ position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)' }} >
//                 <button className="btn btn-sm text-muted" onClick={() => toggleCard(key)}>
//                   <i className="fa-solid fa-chevron-right" style={{
//                     fontSize: '20px', transition: 'transform 0.3s ease',
//                     transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
//                   }} >
//                   </i>
//                 </button>
//               </div>
//             </div>

//             <div className="d-flex justify-content-between px-3 pb-3 flex-wrap gap-2 align-items-center">
//               {order.status === "Cancelled" ? (
//                 <span className="text-danger fw-bold">Order Cancelled</span>
//               ) : order.status === "Delivered" ? (
//                 <span className="text-success fw-bold">Order Delivered</span>
//               ) : (
//                 <>
//                   <button className="btn btn-white w-25 bg-white" onClick={() => handleCancelClick(key)}>Cancel</button>
//                   <button className="btn btn-white w-25 bg-white" onClick={() => handleReplaceClick(key)}>Replace</button>
//                   <button className="btn btn-white w-25 bg-white" onClick={() => handleTrackClick(item._id, key)}>
//                     {isTrackVisible ? "Hide Track" : "Track"}
//                   </button>
//                 </>
//               )}
//             </div>

//             {isCancelFormVisible && (
//               <div className="px-3 pb-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3>Reason for cancellation</h3>
//                     <fieldset>
//                       {[
//                         "Delayed Delivery Cancellation", "Incorrect size ordered", "Duplicate Order",
//                         "Product not required anymore", "Cash Issue", "Ordered by mistake", "Wants to change style/color",
//                       ].map((reason, i) => (
//                         <label key={i} className="d-block my-2">
//                           <input type="radio" className="me-2" name={`cancelReason-${key}`}
//                             onChange={() => handleReasonChange(key, reason)} />
//                           {reason}
//                         </label>
//                       ))}
//                     </fieldset>
//                   </div>
//                 </div>

//                 <div className="container bg-white mt-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <p className="mb-1">REFUND DETAILS</p>
//                       <span className="mb-0 rup"><FaRupeeSign /> 0</span>
//                     </div>
//                     <button
//                       className="btn btn-danger w-25 d-flex justify-content-between align-items-center"
//                       onClick={() => cancel(order._id, key)} >
//                       <span>Cancel</span><FaArrowRight />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isReplaceFormVisible && (
//               <div className="px-3 pb-3">
//                 <div className="card">
//                   <div className="card-body">
//                     <h3>Reason for Replacement</h3>
//                     <fieldset>
//                       {[
//                         "Wrong size delivered", "Damaged product", "Received different item", "Packaging issue", "Other reasons"
//                       ].map((reason, i) => (
//                         <label key={i} className="d-block my-2">
//                           <input type="radio" className="me-2" name={`replaceReason-${key}`}
//                             onChange={() => handleReplaceReasonChange(key, reason)} />
//                           {reason}
//                         </label>
//                       ))}
//                     </fieldset>
//                   </div>
//                 </div>

//                 <div className="container bg-white mt-3">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <p className="mb-1">REPLACEMENT INFO</p>
//                       <span className="mb-0 rup"><FaRupeeSign /> 0</span>
//                     </div>
//                     <button
//                       className="btn btn-warning w-25 d-flex justify-content-between align-items-center"
//                       onClick={() => replace(item._id, key)} >
//                       <span>Replace</span><FaArrowRight />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isTrackVisible && trackData[key] && (
//               <div className="p-3 bg-white mt-2 shadow-sm rounded">
//                 <h5 className="mb-3">Tracking Status</h5>
//                 <div className="d-flex align-items-center gap-3">
//                   <FiPackage size={28} className="text-primary" />
//                   <div>
//                     <strong>{trackData[key].currentStatus}</strong>
//                     <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
//                       Estimated Delivery: {moment(trackData[key].estimatedDelivery).format("ddd, D MMM")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {isCancelled && <div className="alert alert-success m-3">{isCancelled}</div>}
//             {isReplaced && <div className="alert alert-warning m-3">{isReplaced}</div>}
//           </div>
//         );
//       })}
//     </div>
//   ))}
// </div> */}