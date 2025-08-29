import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import image from '../../Assits/myntra-logo-freelogovectors.net_.png'
import { FaMoneyBillWave, FaMobileAlt, FaCreditCard, FaUniversity } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import Swal from "sweetalert2";
const Checkoutpage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedQty, setSelectedQty] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const [addcarts, setAddcart] = useState([]);
  const getCarts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/website/add/list");
      const result = await response.json();
      setAddcart(result.addcarts || result);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  useEffect(() => {
    getCarts();
  }, []);
  


  const getQty = (cart) => selectedQty[cart._id] || cart.qty || 1;

  const totalAmount = addcarts.reduce((total, cart) => {
    return total + getQty(cart) * cart.productprice;
  }, 0);

  const discount = totalAmount > 1000 ? totalAmount * 0.1 : totalAmount * 0.05;
  const finalAmount = totalAmount - discount;

  useEffect(() => {
    const storedQty = JSON.parse(localStorage.getItem("selectedQty"));
    if (storedQty) {
      setSelectedQty(storedQty);
    }
  }, []);


  useEffect(() => {
    const storedQty = JSON.parse(localStorage.getItem("selectedQty"));
    if (storedQty) {
      setSelectedQty(storedQty);
      localStorage.removeItem("selectedQty");
    }
  }, []);


  const handlePayNow = async () => {
    const orderIdObj = JSON.parse(localStorage.getItem("ordersData"));
    if (!orderIdObj || !orderIdObj._id) {
      return Swal.fire({
        icon: "error",
        title: "Missing Order",
        text: "Please place your order first before making payment.",
      });
    }

    const orderId = orderIdObj._id;

    const paymentMethodMap = {
      cod: "COD",
      upi: "UPI",
      cdb: "CARD",
      net: "NETBANKING",
    };

    let paymentDetails = {};
    if (selected === "cdb") {
      paymentDetails = {
        cardNumber: document.getElementById("cardNumber").value,
        nameOnCard: document.getElementById("nameOnCard").value,
        validThru: document.getElementById("validThru").value,
        cvv: document.getElementById("cvv").value,
      };
    }

    const paymentData = {
      orderId,
      paymentMethod: paymentMethodMap[selected],
      amount: parseFloat(finalAmount.toFixed(2)),
      paymentDetails,
    };

    Swal.fire({
      title: "Confirm Payment",
      text: `You are about to pay ₹${finalAmount}. Do you want to continue?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay Now",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        Swal.fire({
          title: "Processing Payment...",
          text: "Please wait while we complete your transaction.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const response = await fetch("http://localhost:4000/api/website/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
          });

          const result = await response.json();

          Swal.close();
          setLoading(false);

          if (response.ok) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful",
              text: "Your order has been placed successfully!",
              confirmButtonText: "OK",
            }).then(() => {
              navigate("/Order-confirmation");
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: result.error || "Something went wrong, please try again.",
            });
          }
        } catch (error) {
          Swal.close();
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: error.message,
          });
        }
      } else {
        Swal.fire({
          icon: "info",
          title: "Payment Cancelled",
          text: "You cancelled the payment process.",
        });
      }
    });
  };



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

      <div className='container mt-4'>
        <div className='row'>
          <div className='col-xl-8'>
            <div>
              <div className='fw-bold fs-5 me-auto'>
                Choose Payment Mode
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 flex-wrap">
                  <div className="text-danger fw-bold fs-5" style={{ cursor: 'pointer' }} onClick={() => setSelected("")} >
                    Recommended
                  </div>
                  {!selected && (
                    <div className="fw-bold fs-5 mt-2 mt-lg-0">
                      Recommended Payment Options
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-5 col-sm-12 border-end mb-3" style={{ backgroundColor: "#f8f9fa", padding: "1rem", }} >
                    <div className={`d-flex align-items-center mb-3 ${selected === 'cod' ? 'fw-bold text-primary' : ''}`}
                      onClick={() => setSelected('cod')}
                      style={{ cursor: 'pointer' }} >
                      <FaMoneyBillWave className="me-2" />
                      Cash On Delivery
                    </div>

                    <div className={`d-flex align-items-center mb-3 ${selected === 'upi' ? 'fw-bold text-primary' : ''}`}
                      onClick={() => setSelected('upi')}
                      style={{ cursor: 'pointer' }} >
                      <FaMobileAlt className="me-2" />
                      UPI (Pay via App)
                    </div>

                    <div className={`d-flex align-items-center mb-3 ${selected === 'cdb' ? 'fw-bold text-primary' : ''}`}
                      onClick={() => setSelected('cdb')}
                      style={{ cursor: 'pointer' }} >
                      <FaCreditCard className="me-2" />
                      Credit/Debit Card
                    </div>

                    <div className={`d-flex align-items-center ${selected === 'net' ? 'fw-bold text-primary' : ''}`}
                      onClick={() => setSelected('net')}
                      style={{ cursor: 'pointer' }} >
                      <FaUniversity className="me-2" />
                      Net Banking
                    </div>
                  </div>

                  <div className="col-md-7 col-sm-12 ps-md-4 d-flex flex-column justify-content-start">
                    {selected === 'cod' && (
                      <div className="mt-2">
                        <div className='text-muted-sm'>
                          <h6 style={{ color: 'orange' }}> Pay on delivery is availble</h6>
                          <button className="btn btn-danger w-100 mt-2 fw-bold" onClick={handlePayNow}>{loading ? "Payment Order..." : "Payment Order"}</button>
                        </div>
                      </div>
                    )}
                    {selected === 'upi' && (
                      <div className="mt-2">
                        <div>
                          <div className='mb-3 fw-bold'>Pay Using UPI</div>
                          <div className="form-check mb-3">
                            <label htmlFor="scan" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="scan" value="scan"
                                onChange={handleChange}
                                checked={selectedOption === 'scan'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/scanpay.webp" alt="Axis Bank" width="50" height="50" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">Sacn and Pay </span>
                            </label>
                            {selectedOption === 'scan' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>
                          <div className="form-check mb-3">
                            <label htmlFor="upi" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="upi" value="upi"
                                onChange={handleChange}
                                checked={selectedOption === 'upi'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/otherupi-logo.webp" alt="Axis Bank" width="50" height="50" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0"> Enter UPI ID </span>
                            </label>
                            {selectedOption === 'upi' && (
                              <div className="mt-2">
                                <input type='text' className="form-control mb-3" placeholder="Enter UPI ID here" />
                                <button className="btn btn-danger w-100 fw-bold" onClick={handlePayNow}>PAY NOW</button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {selected === 'cdb' && (
                      <div>
                        <input type="text" className='form-control mb-2' placeholder='Card Number' id='cardNumber' />
                        <input type="text" className='form-control mb-2' placeholder='Name on Card' id='nameOnCard' />
                        <input type="text" className='form-control mb-2' placeholder='Valid Thru (MM/YY)' id='validThru' />
                        <input type="text" className='form-control mb-2' placeholder='CVV' id='cvv' />
                        <button className='btn btn-danger w-100' onClick={handlePayNow}>PAY NOW</button>
                      </div>
                    )}
                    {selected === 'net' && (
                      <div className="mt-2">
                        <div>
                          <div className="mb-3 fw-bold">Net Banking</div>

                          {/* Axis Bank */}
                          <div className="form-check mb-3">
                            <label htmlFor="axisBank" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="axisBank" value="axis bank"
                                onChange={handleChange}
                                checked={selectedOption === 'axis bank'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/axis.webp" alt="Axis Bank" width="50" height="50" style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">Axis Bank</span>
                            </label>
                            {selectedOption === 'axis bank' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>

                          {/* HDFC Bank */}
                          <div className="form-check mb-3">
                            <label htmlFor="hdfcBank" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="hdfcBank" value="hdfc bank"
                                onChange={handleChange}
                                checked={selectedOption === 'hdfc bank'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/hdfc2.png" alt="HDFC Bank" width="50" height="50"
                                style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">HDFC Bank</span>
                            </label>
                            {selectedOption === 'hdfc bank' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>

                          {/* ICICI Bank */}
                          <div className="form-check mb-3">
                            <label htmlFor="iciciBank" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="iciciBank" value="icici bank"
                                onChange={handleChange}
                                checked={selectedOption === 'icici bank'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/icici.png" alt="ICICI Bank" width="50" height="50"
                                style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">ICICI Bank</span>
                            </label>
                            {selectedOption === 'icici bank' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>

                          {/* KOTAK Bank */}
                          <div className="form-check mb-3">
                            <label htmlFor="iciciBank" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="kotakBank" value="kotak bank"
                                onChange={handleChange}
                                checked={selectedOption === 'kotak bank'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/kotak.png" alt="ICICI Bank" width="50" height="50"
                                style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">ICICI Bank</span>
                            </label>
                            {selectedOption === 'kotak bank' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>

                          {/* SBI Bank */}
                          <div className="form-check mb-3">
                            <label htmlFor="sbiBank" className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }}>
                              <input className="form-check-input" type="radio" name="radioDefault" id="sbiBank" value="sbi"
                                onChange={handleChange}
                                checked={selectedOption === 'sbi'} />
                              <img src="https://constant.myntassets.com/checkout/assets/img/sbi.webp" alt="SBI" width="50" height="50"
                                style={{ borderRadius: '50%', objectFit: 'cover' }} />
                              <span className="form-check-label fw-bold mb-0">SBI</span>
                            </label>
                            {selectedOption === 'sbi' && (
                              <button className="btn btn-danger w-100 mt-2 fw-bold">PAY NOW</button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Details Section */}
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ color: "dark" }} />


      <div className="checkout-footer bg-light pt-3">
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="images d-flex flex-wrap gap-3 justify-content-center mb-3 mb-md-0">
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ssl.png" width="70" height="37" alt="SSL" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-visa.png" width="60" height="37" alt="Visa" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-mc.png" width="60" height="37" alt="MasterCard" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-ae.png" width="60" height="37" alt="American Express" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-dc.png" width="60" height="37" alt="Diners Club" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-nb.png" width="60" height="37" alt="Net Banking" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-cod.png" width="60" height="37" alt="Cash on Delivery" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-rupay.png" width="60" height="37" alt="RuPay" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-paypal.png" width="60" height="37" alt="PayPal" />
            <img className="footer-bank-icon" src="https://constant.myntassets.com/checkout/assets/img/footer-bank-bhim.png" width="60" height="37" alt="BHIM" />
          </div>
          <Link to="/Contact-us" className="contact-us text-decoration-none text-black fw-bold">
            <span>Need Help? Contact Us</span>
          </Link>
        </div>
      </div>

    </>
  )
}
export default Checkoutpage