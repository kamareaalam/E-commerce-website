import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";
import Swal from "sweetalert2";


const Contactus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      access_key: "2f35859c-bdf2-42f8-afe3-b7ebf25adab7",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        // SweetAlert confirmation
        Swal.fire({
          title: "Message sent successfully!",
          text: "Do you want to go to the Thank You page?",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
        }).then((res) => {
          if (res.isConfirmed) {
            navigate("/Home");
          }
        });

        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Network error!", "error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      {/* Navbar */}
      <section className="bg-white shadow-sm py-2" style={{ position: 'sticky', top: '0', zIndex: '9999' }}>
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

      {/* Contact Form */}
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 shadow p-4 rounded bg-white">
            <h3 className="text-center text-danger mb-4">
              <i className="fa fa-headset me-2"></i>Contact Us
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email ID</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Mobile No</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter your mobile number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Type your message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
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

export default Contactus;
