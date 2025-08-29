import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';



const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const location = useLocation();

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    colors: [],
    sizes: [],
    discounts: [],
    price: [0, 10000],
    gender: [],
    bundles: [],
    country: [],
    sort: "",
    search: ""
  });

  //  Read filters from homepage link
  useEffect(() => {
    const query = queryString.parse(location.search);
    const parseValue = (val) =>
      Array.isArray(val) ? val : val?.split(",").filter(Boolean) || [];

    const homepageFilters = {
      gender: parseValue(query.gender),
      brands: parseValue(query.brand),
      categories: parseValue(query.category)
    };

    setFilters((prev) => ({ ...prev, ...homepageFilters }));
  }, [location.search]);


  // Fetch products from API with merged filters
  const fetchFilteredProducts = useCallback(async (extraFilters = {}) => {
    const finalFilters = { ...filters, ...extraFilters };

    const params = new URLSearchParams();
    const fieldMap = {
      brands: "brand",
      categories: "category",
      colors: "color",
      sizes: "size",
      discounts: "discount",
      gender: "gender",
      bundles: "bundle",
      country: "country",
      categoryname: "category"
    };

    Object.entries(finalFilters).forEach(([key, value]) => {
      const paramKey = fieldMap[key] || key;
      if (Array.isArray(value) && value.length > 0) {
        params.set(paramKey, value.join(","));
      } else if (key === "price" && value.length === 2) {
        params.set("minPrice", value[0]);
        params.set("maxPrice", value[1]);
      } else if ((key === "sort" || key === "search") && value) {
        params.set(paramKey, value);
      }
    });

    try {
      const response = await fetch(
        `http://localhost:4000/api/website/productfilter?${params.toString()}`
      );
      const result = await response.json();
      setProducts(result.products || []);
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      setProducts([]);
    }
  }, [filters]);

  // Re-fetch when filters change (no page refresh needed)
  useEffect(() => {
    fetchFilteredProducts();
  }, [filters, fetchFilteredProducts]);

  // Filter change handler
  const handleFilterChange = (type, value) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (type === "brands" || type === "gender") {
        if (updated[type].includes(value)) {
          updated[type] = updated[type].filter((v) => v !== value);
        } else {
          updated[type] = [...updated[type], value];
        }
      } else if (type === "sort") {
        updated.sort = value;
      } else {
        if (updated[type].includes(value)) {
          updated[type] = updated[type].filter((v) => v !== value);
        } else {
          updated[type] = [...updated[type], value];
        }
      }

      return updated;
    });
  };



  //  Search handler
  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  // add to wishlist
  const addToWishlist = async (product) => {
    const user = JSON.parse(localStorage.getItem("webuser"));
    if (!user?._id) return alert("Login required.");

    try {
      const wishlistData = {
        userId: user._id,
        productId: product._id,
        productname: product.productname,
        productprice: product.productprice,
        productoriginalprice: product.productoriginalprice,
        productdescription: product.productdescription,
        productsize: product.productsize,
        productphotourl: product.productphotourl
      };

      const res = await fetch("http://localhost:4000/api/website/addwishlist", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(wishlistData)
      });

      const result = await res.json();
      alert(result.message || "Added to wishlist.");
      setWishlist(prev => [...prev, product._id]);
    } catch (err) {
      alert("Error: " + err.message);
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
                    <input className="form-control" style={{ width: '700px' }} type="search" placeholder="Search for products, brands, and more" onChange={(e) => handleSearch(e.target.value)} />
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

      <section className='productdetails py-5'>
        <nav className='navbar navbar-white bg-secondary'>
          <div className='w-100 d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center px-3 gap-3'>

            {/* FILTER TITLE (Left) */}
            <Link className='navbar-brand text-white me-md-3'>FILTER</Link>

            {/* Centered Dropdowns */}
            <div className='d-flex flex-column flex-sm-row flex-wrap align-items-start align-items-sm-center justify-content-center gap-3 flex-grow-1'>

              {/* Bundles Dropdown */}
              <div className='dropdown'>
                <button className='btn btn-light dropdown-toggle' type='button' id='dropdownBundles' data-bs-toggle='dropdown' aria-expanded='false'>
                  Bundles
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownBundles'>
                  {['Bundles', 'Single style'].map(b => (
                    <li key={b}>
                      <label className="dropdown-item"><input type="checkbox" onChange={() => handleFilterChange('bundles', b)} /> {b}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Country of Origin Dropdown */}
              <div className='dropdown'>
                <button className='btn btn-light dropdown-toggle' type='button' id='dropdownCountry' data-bs-toggle='dropdown' aria-expanded='false'>
                  Country of Origin
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownCountry'>
                  {['India', 'China', 'Saudi Arabia', 'America', 'Other'].map(country => (
                    <li key={country}>
                      <label className="dropdown-item"><input type="checkbox" checked={filters.country.includes(country)} onChange={() => handleFilterChange('country', country)} /> {country}</label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Dropdown */}
              <div className='dropdown'>
                <button className='btn btn-light dropdown-toggle' type='button' id='dropdownSize' data-bs-toggle='dropdown' aria-expanded='false'>
                  Size
                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownSize'>
                  {['X', 'S', 'M', 'L', 'XL'].map(s => (
                    <li key={s}>
                      <label className="dropdown-item"><input type="checkbox" onChange={() => handleFilterChange('sizes', s)} /> {s}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sort Dropdown (Right) */}
            <div className="dropdown" >
              <button className="btn btn-light dropdown-toggle" type="button" id="dropdownSort" data-bs-toggle="dropdown" aria-expanded="false" style={{ marginRight: '20px' }}>
                Recommended
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownSort">
                {["What's New", 'Popularity', 'Better Discount', 'Price: High to Low', 'Price: Low to High', 'Customer Rating'
                ].map((option) => (
                  <li key={option}>
                    <label className="dropdown-item">
                      <input type="radio" name="sort" checked={filters.sort === option}
                        onChange={() => handleFilterChange('sort', option)}
                      /> {option} </label>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </nav>
      </section>

      <section className="row m-0 productlist">
        {/* FILTER SIDEBAR */}
        <div className="col-lg-2 col-md-3 col-sm-4 p-2">
          <div className="card p-3" style={{position:'sticky', top:'0px'}}>
            <ul className="list-group list-group-flush">
              {/* GENDER FILTER */}
              <h5>GENDER</h5>
              {['Male', 'Boys', 'Female', 'Girls', 'Kids'].map(g => (
                <label key={g} className="d-block mb-1">
                  <input type='checkbox' checked={(filters.gender || []).includes(g)} onChange={() => handleFilterChange('gender', g)} className="me-2" />
                  {g}
                </label>
              ))}
              <hr />

              {/* BRAND FILTER */}
              <h5>BRANDS</h5>
              {['Fossil', 'Fastrack', 'Rolex', 'Titan', 'Adidas', 'Puma', 'Nike', 'Aldo', 'Sgya', 'Ethics', 'Dennis Lingo', 'Roadster', 'Superdry', 'Reebok', 'DressBerry', 'Enamor', 'Manyavar', 'Jompers'].map(b => (
                <label key={b} className="d-block mb-1">
                  <input type='checkbox' checked={(filters.brands || []).includes(b)} onChange={() => handleFilterChange('brands', b)} className="me-2" />
                  {b}
                </label>
              ))}
              <hr />

              {/* PRICE RANGE */}
              <h6>PRICE</h6>
              <label className="d-block mb-2">₹{filters.price[0]} - ₹{filters.price[1]}</label>
              <input type="range" min="0" max="10000" value={filters.price[1]}
                onChange={(e) => setFilters(prev => ({ ...prev, price: [0, Number(e.target.value)] }))}
                className="form-range" />
              <hr />

              {/* COLOR FILTER */}
              <h5>COLORS</h5>
              {['Red', 'Blue', 'Black', 'White', 'Pink', 'Green'].map(c => (
                <label key={c} className="d-block mb-1">
                  <input type="checkbox" onChange={() => handleFilterChange('colors', c)} className="me-2" />
                  {c}
                </label>
              ))}
              <hr />

              {/* DISCOUNT FILTER */}
              <h5>DISCOUNT</h5>
              {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(d => (
                <label key={d} className="d-block mb-1">
                  <input type="checkbox" onChange={() => handleFilterChange('discounts', String(d))} className="me-2" />
                  {d}% and above
                </label>
              ))}
            </ul>
          </div>
        </div>

        {/* PRODUCT LIST */}
        <div className="col-lg-10 col-md-9 col-sm-8 p-2">
          <div className="row g-0">
            {products.length === 0 ? (
              <div className="col-12 text-center">No products available</div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-4 col-sm-6 col-6 p-2">
                  <div className="bg-white position-relative rounded shadow h-100 p-2">
                    <div className='text-end position-absolute top-0 end-0 p-2'>
                      <button
                        onClick={() => addToWishlist(product)}
                        className={`btn btn-sm ${wishlist.includes(product._id) ? 'btn-danger text-white' : 'btn-outline-danger'}`} >
                        <i className="fa-regular fa-heart"></i>
                      </button>
                    </div>

                    <Link to={`/Product-detail/${product._id}`}>
                      <div style={{ width: '100%', height: '350px', overflow: 'hidden' }}>
                        <img
                          src={product.productphotourl}
                          alt={product.productname}
                          className="img-fluid w-100 h-100"
                          style={{ objectFit: 'cover', objectPosition: 'top' }}
                        />
                      </div>
                    </Link>

                    <div className="product-item text-center mt-2">
                      <h5 className="mb-0 text-truncate">{product.productname}</h5>
                      <p className="text-muted medium mb-0 text-truncate">{product.productdescription}</p>
                    </div>

                    <div className="product-rating text-center text-muted small mt-2">
                      <span className="fw-bold">
                        <i className="fa-solid fa-rupee-sign"></i> {product.productprice}
                      </span>
                      <s className="ms-2">₹{product.productoriginalprice}</s>
                      <span style={{ color: 'orange', fontWeight: 'bold' }} className="ms-2 className='discount'">
                        ({Math.round(((Number(product.productoriginalprice) - Number(product.productprice)) / Number(product.productoriginalprice)) * 100)}% OFF)
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
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

export default Productlist