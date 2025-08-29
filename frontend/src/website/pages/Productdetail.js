import { Link } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Productdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [cart, setCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');

  const getProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/website/productdetails/${productId}`);
      const result = await response.json();
      setProduct(result);
    } catch (error) {
      console.error("Error fetching product details:", error.message);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const addToWishlist = async (product) => {
    const user = JSON.parse(localStorage.getItem("webuser"));
    if (!user?._id || !product?._id) {
      alert("Login required or invalid product");
      return;
    }

    try {
      const wishlistData = {
        userId: user._id,
        productId: product._id,
        productname: product.productname,
        productprice: product.productprice,
        productdescription: product.productdescription,
        productoriginalprice: product.productoriginalprice,
        productsize: product.productsize,
        productphotourl: product.productphotourl
      };

      const response = await fetch("http://localhost:4000/api/website/addwishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishlistData),
      });

      const result = await response.json();
      alert(result.message || "Added to wishlist successfully");
      setWishlisted(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("webuser"));
    if (!user?._id) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    if (!selectedSize) return alert("Please select a size.");
    try {
      const cartData = {
        userid: user._id,
        productID: product._id,
        productname: product.productname,
        productdescription: product.productdescription,
        productprice: product.productprice,
        productoriginalprice: product.productoriginalprice,
        productsize: selectedSize,
        productphotourl: product.productphotourl
      };

      const response = await fetch("http://localhost:4000/api/website/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(cartData),
      });

      const result = await response.json();
      alert(result.message || "Added to cart successfully");
      setCart(true);
      navigate("/User-cart")
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (!product) {
    return (
      <div className="text-center p-5">
        <h3>Loading product details...</h3>
      </div>
    );
  }


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


      <section className="productdetails p-5">
        <div className="row">
          {/* LEFT: PRODUCT IMAGE */}
          <div className="col-lg-6 text-center">
            <img
              src={product.productphotourl}
              alt={product.productname}
              className="img-fluid rounded shadow"
              style={{ maxHeight: "700px", objectFit: "contain" }}
            />
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="col-lg-6">
            <h2>{product.productname}</h2>
            <p className="text-muted">{product.productdescription}</p>

            {/* Rating */}
            <button className="btn btn-outline-success mb-3">
              4.3 <i className="fa-solid fa-star"></i> | 730 Ratings
            </button>

            {/* Price */}
            <div className="mb-3">
              <span className="fw-bold fs-4 text-dark">₹{product.productprice}</span>
              <span className="text-decoration-line-through text-muted ms-2">
                ₹{product.productoriginalprice}
              </span>
              {product.productoriginalprice > 0 && (
                <span className="text-danger fw-bold ms-2">
                  (
                  {Math.round(
                    ((product.productoriginalprice - product.productprice) /
                      product.productoriginalprice) *
                    100
                  )}
                  % OFF)
                </span>
              )}
            </div>
            <p className="text-success small">Inclusive of all taxes</p>

            {/* Sizes */}
            <div className="mb-3">
              <h5>Select Size</h5>
              <div className="d-flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <span
                    key={size}
                    className={`border px-3 py-2 rounded ${selectedSize === size ? "bg-dark text-white" : ""
                      }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="row mb-4">
              <div className="col">
                <button
                  className={`w-100 p-3 border rounded ${cart ? "bg-danger text-white" : "bg-secondary text-white"
                    }`}
                  onClick={() => addToCart(product)}
                >
                  <i className="fa-solid fa-cart-shopping"></i> Add to Cart
                </button>
              </div>
              <div className="col">
                <button
                  className={`w-100 p-3 border rounded ${wishlisted ? "bg-danger text-white" : "bg-secondary text-white"
                    }`}
                  onClick={() => addToWishlist(product)}
                >
                  <i
                    className={wishlisted ? "fa-solid fa-heart" : "fa-regular fa-heart"}
                  ></i>{" "}
                  Wishlist
                </button>
              </div>
            </div>

            {/* Delivery */}
            <h5>
              Delivery Options <i className="fa-solid fa-truck"></i>
            </h5>
            <div className="input-group mb-2" style={{ maxWidth: "300px" }}>
              <input
                type="text"
                placeholder="Enter pincode"
                className="form-control"
              />
              <button className="btn btn-dark">Check</button>
            </div>
            <small className="text-muted">
              Please enter PIN code to check delivery time & availability.
            </small>

            {/* OFFERS */}
            <div className="offers mt-4">
              <h4>
                BEST OFFERS <i className="fa-solid fa-tag"></i>
              </h4>
            </div>
            <div className="best-price">
              <span className="price">Best Price: </span>
              <span className="rs">Rs.222</span>
              <ul className="coupon-list">
                <li>
                  Applicable on: Orders above Rs. 699 (only on first purchase)
                </li>
                <li>
                  <span>Coupon code: </span>
                  <span className="city">CITYMANIA</span>
                </li>
                <li>
                  Coupon Discount: 25% off (Your total saving: Rs. 877)
                </li>
              </ul>
            </div>

            {/* Discount sections */}
            <div className="discount">
              <h5>10% Discount on PNB Credit Cards.</h5>
              <ul>
                <li>Min Spend ₹3000, Max Discount ₹1500.</li>
              </ul>
            </div>

            <div className="discount">
              <h5>10% Discount on Kotak Credit and Debit Cards.</h5>
              <ul>
                <li>Min Spend ₹5000, Max Discount ₹1500.</li>
              </ul>
            </div>

            <div className="discount">
              <h5>10% Discount on HSBC Credit Cards.</h5>
              <ul>
                <li>Min Spend ₹5000, Max Discount ₹1500.</li>
              </ul>
            </div>

            <div className="discount">
              <h5>7.5% Discount on Myntra Kotak Credit Cards.</h5>
              <ul>
                <li>Max Discount up to ₹750 on every spends</li>
              </ul>
            </div>

            <hr />

            {/* PRODUCT DETAILS */}
            <div className="products">
              <h5>
                PRODUCT DETAILS <i className="fa-solid fa-list"></i>
              </h5>
              <p>Olive Green solid knitted regular top, has a V-neck, and long sleeves</p>
            </div>

            <div className="size-fit">
              <h5>Size &amp; Fit</h5>
              <p>The model (height 5'8") is wearing a size S</p>
            </div>

            <div className="material-care">
              <h5>Material &amp; Care</h5>
              <p>Material: 65% cotton, 35% polyester</p>
              <p>Machine Wash</p>
            </div>

            {/* Specification */}
            {/* <div className="specification row">
              <h5>Specification</h5>
              <div className="col-sm-6">
                <span>Sleeve Length</span>
                <h6>Long Sleeves</h6>
              </div>
              <div className="col-sm-6">
                <span>Neck</span>
                <h6>V-Neck</h6>
              </div>
              <hr />
              <div className="col-sm-6">
                <span>Type</span>
                <h6>Regular</h6>
              </div>
              <div className="col-sm-6">
                <span>Print or Pattern Type</span>
                <h6>Solid</h6>
              </div>
              <hr />
              <div className="col-sm-6">
                <span>Sleeve Style</span>
                <h6>Regular Sleeves</h6>
              </div>
              <div className="col-sm-6">
                <span>Transparency</span>
                <h6>Opaque</h6>
              </div>
              <hr />
              <div className="col-sm-6">
                <span>Length</span>
                <h6>Regular</h6>
              </div>
              <div className="col-sm-6">
                <span>Main Trend</span>
                <h6>Utility or Military Inspired</h6>
              </div>
              <hr />
              <div className="col-sm-6">
                <span>Occasion</span>
                <h6>Casual</h6>
              </div>
              <div className="col-sm-6">
                <span>Weave Type</span>
                <h6>Knitted</h6>
              </div>
            </div> */}

            {/* Complete Look */}
            <div className="complete-look mt-4">
              <h5>Complete The Look</h5>
              <p>
                Spruce up your look with this high-end top from Roadster. This olive
                piece is perfect for hanging out with friends when you put it with a
                fabulous dark denim jean and your favourite pair of shoes.
              </p>
            </div>

            <hr />

            {/* RATING */}
            <div className="rating-section">
              <h5>
                RATING <i className="fa-solid fa-star"></i>
              </h5>
              <div className="row">
                <div className="col-sm-6">
                  <span style={{ fontSize: "48px" }}>4.3</span>
                  <span style={{ color: "green", marginLeft: "5px" }}>
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <p>730 Verified Buyers</p>
                </div>
                <div className="col-sm-6">
                  {[5, 4, 3, 2, 1].map((num, idx) => (
                    <div key={idx} className="d-flex align-items-center gap-2">
                      <span>{num}</span>
                      <i className="fa-solid fa-star"></i>
                      <progress min="0" max="730" value="100"></progress>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CUSTOMER REVIEW */}
            <div className="customer-review mt-4">
              <h5>
                WHAT CUSTOMERS SAID <i className="fa-regular fa-star"></i>
              </h5>
              <label> Fit </label>
              <progress min="0" max="100" value="77"> </progress>
              <span> Just Right (77%) </span>
            </div>

            <hr />

            {/* Seller Info */}
            <div>
              <span>Product Code: </span>
              <b>11893556</b>
            </div>
            <div>
              <span>Seller: </span>
              <span style={{ color: "red", fontWeight: "bold" }}>Truenet Commerce</span>
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

export default Productdetail
