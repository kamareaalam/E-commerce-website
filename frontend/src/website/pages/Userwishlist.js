import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";
import { useNavigate } from 'react-router-dom';

const Userwishlist = () => {
  const navigate = useNavigate("")
  const [wishlists, setWishlist] = useState([]);

  const getWishlists = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/website/addwishlist/list");
      const result = await response.json();
      const updated = result.getWishlist.map(product => ({
        ...product,
        showSizes: false,
        selectedSize: ''
      }));
      setWishlist(updated);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getWishlists();
  }, []);

  const remove = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/website/addwishlist/remove/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await getWishlists();
        alert("Removed Successfully");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleMoveToCartClick = (id) => {
    const updated = wishlists.map(item =>
      item._id === id
        ? item.selectedSize
          ? (addToCart(item), { ...item, showSizes: false }) // already selected → add
          : { ...item, showSizes: true } // show size
        : { ...item, showSizes: false } // hide others
    );
    setWishlist(updated);
  };

  const handleSizeSelect = (id, size) => {
    const updated = wishlists.map(item =>
      item._id === id ? { ...item, selectedSize: size } : item
    );
    setWishlist(updated);
  };

  const addToCart = async (product) => {
    const user = JSON.parse(localStorage.getItem("webuser"));
    if (!user?._id) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    const cartData = {
      userid: user._id,
      productID: product._id,
      productname: product.productname,
      productdescription: product.productdescription,
      productprice: product.productprice,
      productoriginalprice: product.productoriginalprice,
      productsize: product.selectedSize,
      productphotourl: product.productphotourl
    };

    try {
      const response = await fetch("http://localhost:4000/api/website/add", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(cartData),
      });

      const result = await response.json();
      alert(result.message || "Added to cart successfully");
      navigate("/User-cart")
    } catch (error) {
      alert("Error: " + error.message);
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

      <section className='container-fluid wishlist pt-5'>
        <div className='row'>
          <div className='col-lg-12 mb-3'>
            <h3>My Wishlist ({wishlists.length} items)</h3>
          </div>

          <div className='row'>
            {wishlists.map((product) => (
              <div key={product._id} className='col-lg-2 col-md-4 col-sm-6 col-6 mb-4'>
                <div className='position-relative rounded shadow p-2'>
                  {/* Remove Button */}
                  <button className="btn btn-light btn-md text-danger position-absolute top-2 end-0 m-1 rounded-circle"
                    onClick={() => remove(product._id)}>
                    <i className="fa-solid fa-xmark"></i>
                  </button>

                  {/* Product Image */}
                  <div style={{ width: '100%', height: '280px', overflow: 'hidden' }}>
                    <img src={product.productphotourl} alt={product.productname} className="img-fluid" style={{ objectFit: 'cover' }} />
                  </div>

                  {/* Show size only when move-to-cart clicked */}
                  {product.showSizes && (
                    <div className='d-flex flex-wrap gap-2 justify-content-center mt-2'>
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <div key={size}
                          className={`border px-2 py-1 rounded ${product.selectedSize === size ? 'bg-dark text-white' : ''}`}
                          style={{ cursor: 'pointer', fontSize: '14px' }}
                          onClick={() => handleSizeSelect(product._id, size)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Hide product name and price when size is open */}
                  {!product.showSizes && (
                    <>
                      <p className='mt-2 mb-1 text-center'>{product.productname}</p>
                      <div className='product-rating text-center'>
                        <span className='fw-bold'>Rs.{product.productprice}</span>
                      </div>
                    </>
                  )}

                  <hr />

                  {/* Move to cart */}
                  <h6 className='text-center'
                    style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => handleMoveToCartClick(product._id)}>
                    MOVE TO CART
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Userwishlist;
