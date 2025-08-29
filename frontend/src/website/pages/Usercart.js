import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../../Assits/myntra-logo-freelogovectors.net_.png';
import { useLocation } from 'react-router-dom';

const Usercart = () => {
  const [addcarts, setAddcart] = useState([]);
  const [selectedQty, setSelectedQty] = useState({});

  useEffect(() => {
    const getCarts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/website/add/list");
        const result = await response.json();
        setAddcart(result.addcarts || result);
      } catch (error) {
        alert("Error: " + error.message);
      }
    };
    getCarts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/website/add/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAddcart(prev => prev.filter(cart => cart._id !== id));
      } else {
        console.error("Failed to delete cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting cart:", error);
    }
  };

  const handleQtyChange = (cartId, qty) => {
    const updatedQty = { ...selectedQty, [cartId]: qty };
    setSelectedQty(updatedQty);
    localStorage.setItem("selectedQty", JSON.stringify(updatedQty));
  };

  const getQty = (cart) => selectedQty[cart._id] || cart.qty || 1;

  const totalAmount = addcarts.reduce((total, cart) => {
    return total + getQty(cart) * cart.productprice;
  }, 0);

  const discount = totalAmount > 1000 ? totalAmount * 0.1 : totalAmount * 0.05;
  const finalAmount = totalAmount - discount;

  const location = useLocation();
  const currentPath = location.pathname;

  const getClass = (path) => {
    if (path === currentPath) return 'step active';
    if (
      (path === '/User-cart' && (currentPath === '/address' || currentPath === '/checkout-page')) ||
      (path === '/address' && currentPath === '/checkout-page')
    ) return 'step completed';
    return 'step';
  };

  return (
    <>
      {/* Navbar */}
      <section className="bg-white shadow-sm py-2">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid px-3 px-lg-4">

            <Link className="navbar-brand me-3" to="/">
              <img src={image} alt="Myntra" style={{ width: '50px', marginLeft: '50px' }}
                className="rounded-pill" />
            </Link>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
              <ul className="checkout-steps d-flex align-items-center gap-3 m-0 p-0">
                <li className={getClass('/User-cart')}>
                  <Link to="/User-cart">CART</Link>
                </li>
                <li className="divider"></li>
                <li className={getClass('/address')}>
                  <Link to="/address">ADDRESS</Link>
                </li>
                <li className="divider"></li>
                <li className={getClass('/checkout-page')}>
                  <Link to="/checkout-page">PAYMENT</Link>
                </li>
              </ul>
            </div>

            <div className="d-flex justify-content-end align-items-center" style={{ paddingRight: '50px' }}>
              <div className="secureContainer d-flex gap-2 align-items-center">
                <img
                  src="https://constant.myntassets.com/checkout/assets/img/sprite-secure.png"
                  className="secureIcon"
                  width="26"
                  height="28"
                  alt="Secure Icon"
                />
                <div className="secure text-uppercase fw-bold" style={{ fontSize: '13px' }}>100% Secure</div>
              </div>
            </div>
          </div>
        </nav>
      </section>

      {/* Cart Items */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-8 mb-4">
            {addcarts.map(cart => (
              <div className="card mb-3 position-relative" key={cart._id}>
                <div className="card-body d-flex align-items-center">
                  <div className="me-3">
                    <img src={cart.productphotourl || "default.jpeg"} alt={cart.productname} style={{ width: "150px", height: "150px", objectFit: "contain" }} />
                  </div>
                  <div className="flex-grow-1">
                    <h5>{cart.productname}</h5>
                    <p className="text-muted">{cart.productdescription}</p>
                    <p>Size: {cart.productsize}</p>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <div className="dropdown">
                        <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          Qty: {getQty(cart)}
                        </button>
                        <ul className="dropdown-menu p-2" style={{ minWidth: '150px' }}>
                          <div className="d-flex flex-row flex-wrap gap-2 mb-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(qty => (
                              <li key={qty}>
                                <button className="dropdown-item border rounded-circle text-center py-1 px-2" onClick={() => handleQtyChange(cart._id, qty)}>
                                  {qty}
                                </button>
                              </li>
                            ))}
                          </div>
                        </ul>
                      </div>
                    </div>
                    <p className="mb-2 text-muted">Price: ₹ {cart.productprice}</p>
                  </div>
                  <div className="position-absolute top-0 end-0 m-2">
                    <button className="btn btn-sm text-muted" onClick={() => handleDelete(cart._id)}>
                      <i className="fa-solid fa-xmark fs-5"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-xl-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h6 className="mb-3">PRICE DETAILS ({addcarts.length} Items)</h6>
                {addcarts.map(cart => (
                  <div className="d-flex justify-content-between align-items-center mb-2" key={cart._id}>
                    <span>{cart.productname} (x{getQty(cart)})</span>
                    <span>₹ {getQty(cart) * cart.productprice}</span>
                  </div>
                ))}
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹ {totalAmount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Discount on MRP</span>
                  <span className="fw-bold text-success">- ₹ {discount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Platform Fee</span>
                  <span className="fw-bold text-success">Free</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="fw-bold text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total Amount</span>
                  <span>₹ {finalAmount.toFixed(2)}</span>
                </div>
                <Link to="/address">
                  <button className="btn btn-danger btn-lg w-100 mt-4">Place Order</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Link */}
      <div className="container mb-4" style={{ marginTop: '-80px', }}>
        <div className="row">
          <div className="col-xl-8">
            <Link to="/User-wish-list" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-body d-flex align-items-center gap-3">
                  <i className="fa-solid fa-bookmark" style={{ fontSize: '16px' }}></i>
                  <div className="wishlist-text fw-medium">Add More From Wishlist</div>
                  <i className="fa-solid fa-chevron-right ms-auto" style={{ fontSize: '16px' }}></i>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <hr />

      {/* Footer */}
      <div className="checkout-footer bg-light pt-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="images d-flex flex-wrap gap-3 justify-content-center mb-3 mb-md-0">
            {['ssl', 'visa', 'mc', 'ae', 'dc', 'nb', 'cod', 'rupay', 'paypal', 'bhim'].map(key => (
              <img
                key={key}
                src={`https://constant.myntassets.com/checkout/assets/img/footer-bank-${key}.png`}
                width="60"
                height="37"
                alt={key.toUpperCase()}
              />
            ))}
          </div>
          <Link to="/Contact-us" className="text-decoration-none text-black fw-bold">
            Need Help? Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Usercart;
