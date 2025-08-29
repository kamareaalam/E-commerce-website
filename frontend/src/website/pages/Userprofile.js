import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import image from '../../Assits/myntra-logo-freelogovectors.net_.png'
import { useNavigate } from 'react-router-dom'
const Userprofile = () => {
  const [webuser, setWebuser] = useState({
    fullname: '',
    mobileno: '',
    email: '',
    dob: '',
    password: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
  });
  useEffect(() => {
    const storedWebuser = JSON.parse(localStorage.getItem("webuser"));
    if (storedWebuser) {
      setWebuser({
        _id: storedWebuser._id || '',
        fullname: storedWebuser.fullname || '',
        mobileno: storedWebuser.mobileno || '',
        email: storedWebuser.email || '',
        dob: storedWebuser.dob || '',
        password: storedWebuser.password || '',
        address: storedWebuser.address || '',
        pincode: storedWebuser.pincode || '',
        city: storedWebuser.city || '',
        state: storedWebuser.state || '',
      });
    }
  }, []);
  const navigate = useNavigate();
  const handleEdit = (webuser) => {
    navigate('/Registration', { state: { webuser } });
  };





  const logout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/website/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ id: webuser._id })
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.removeItem("webuser");
        localStorage.removeItem("token");
        alert("Logout successful");
        navigate("/website-login");
      } else {
        alert(result.message || "Logout failed");
      }
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };


  return (
    <>
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

      <section className="container p-5">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <div className="mb-2">
              <h5>Account</h5>
              <hr />
            </div>

            <div className="mb-5">
              <h6>Overview</h6>
            </div>
            <hr />

            <div className="mb-4">
              <p>Other</p>
              <Link to="/User-order-list" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Order & Returns</h6>
              </Link>
              {/* <Link to="/Order-confirmation" style={{ textDecoration: 'none', color: 'black' }}>
                <h6>Order List</h6>
              </Link> */}
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
              <h6>Profile</h6>
              <h6>Saved Cards</h6>
              <h6>Saved UPI</h6>
              <h6>Saved Wallets</h6>
              <h6>Addresses</h6>
              <h6 onClick={logout} style={{ cursor: 'pointer' }}>Delete Account</h6>
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
          <div className="col-lg-9 col-md-12">
            <div className="card p-4">
              <div className="form">
                <h4 className="mb-4">Profile Details</h4>
                <hr />

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">Full Name</div>
                  <div className="col-md-6 col-7">{webuser.fullname}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">Mobile No</div>
                  <div className="col-md-6 col-7">{webuser.mobileno}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">Email</div>
                  <div className="col-md-6 col-7">{webuser.email}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">DOB</div>
                  <div className="col-md-6 col-7">{webuser.dob}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">Address</div>
                  <div className="col-md-6 col-7">{webuser.address}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">Pincode</div>
                  <div className="col-md-6 col-7">{webuser.pincode}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">City</div>
                  <div className="col-md-6 col-7">{webuser.city}</div>
                </div>

                <div className="row rowdiv mb-3">
                  <div className="col-md-6 col-5 labe">State</div>
                  <div className="col-md-6 col-7">{webuser.state}</div>
                </div>

                <div className='text-center mt-5'>
                  <button className='btn btn-success w-25' onClick={() => handleEdit(webuser)}>Edit</button>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

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
  )
}

export default Userprofile
