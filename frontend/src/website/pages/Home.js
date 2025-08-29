import React from 'react';
import { Link } from 'react-router-dom';
import image from "../../Assits/myntra-logo-freelogovectors.net_.png";


const Home = () => {
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

      <section className='container-fluid pt-2' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div>
          <img src='https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/APRIL/30/2kmiprsn_19a19eddfe4441ad8b6a4d763224c0b9.jpg'
            alt='banner' className='img-fluid w-100' style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      </section>


      <section className="container-fluid" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="row g-0">

          <div className="col-sm-6">
            <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/29/cd234c7f-e1eb-4df4-bac4-ceb5a3e4a8de1745936750479-Slice-1.jpg" alt="Women Category" className="img-fluid" />
          </div>

          <div className="col-sm-6 ">
            <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/29/e297224d-6484-4531-9f65-02c027c840251745936750435-Slice-2.jpg" alt="Men Category" className="img-fluid" />
          </div>
        </div>

        <div >
          <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/MAY/2/rKXu7Xa7_6761fa0aed334517aa14ee31a0ed605b.gif"
            alt="MFCO Offer Banner" className="img-fluid" style={{ width: '100%' }} />
        </div>

        <div>
          <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/24/306c02aa-f4c5-4dbb-a9f4-ed393839d53d1745479732014-Coupons.jpg" alt="Coupons Banner" className="img-fluid" style={{ width: '100%' }} />
        </div>
      </section>

      <section className="container-fluid pt-3" style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="row g-1">
          <div className="col-6">
            <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/28/77ddd555-dc0b-429d-ad8d-71caa5a1a7bf1745831660365-Flat-100-Off-----1.jpg"
              alt="Flat 100 offer" className="img-fluid" />
          </div>
          <div className="col-6">
            <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/28/1cc3b362-1d19-4212-82c9-104f1fd51fdd1745831668546-Flat-200-Off-----1.jpg"
              alt="Flat 200 offer" className="img-fluid " />
          </div>
        </div>
      </section>

      <section className="container-fluid " style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className="col-12">
          <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/28/ef699d63-76c5-42f7-9816-6c0cefd354c21745831588407-Oye-Hoye-Deals.jpg"
            alt="Oye Hoye Deals" className="img-fluid w-100" />
        </div>
      </section>

      <section className='container-fluid pt-4' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner text-center">
            <div className="carousel-item active">
              <div className="d-flex flex-wrap justify-content-center">
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_196,c_limit/assets/images/2025/APRIL/29/1Av9YixC_a18a4c04f58a43d5acdfe67858ac6119.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_196,c_limit/assets/images/2025/APRIL/29/wrFZWVkN_fd46103b6d8e4729a1db01e2e4b51f0b.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_196,c_limit/assets/images/2025/APRIL/29/qqPsXupA_7f172e651fdc45ad92aff43c77d08378.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_196,c_limit/assets/images/2025/APRIL/29/O4f17VPe_e3cca8fd89c74c6db1dd4c7f76b11e2b.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_196,c_limit/assets/images/2025/APRIL/29/lls5ivaN_068356daf8cb43d7a5edd65671ebe648.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex flex-wrap justify-content-center">
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/oM1MAJTf_23dce6969b4a4186846f0943744d308b.png" alt="Banner 1" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/IeFsShQQ_337c8bc2815d49aa9dc4c8b919f777b4.png" alt="Banner 2" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/ZhkgiU2w_f60f9054fb8c442eb11baa2606f91439.png" alt="Banner 3" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/MV8q5fpc_29f689dd17874899a48c7f1cbc08bc44.png" alt="Banner 4" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/1NnnmPKs_6f8b21789a5047be961c10e9ba9e659a.png" alt="Banner 5" style={{ width: '338px' }} />
                </Link>
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex flex-wrap justify-content-center">
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/qbPZodC9_7d017f17942d49508fa39b510e1a2019.png" alt="Brand 1" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/dxfPYVZj_d9db38c242304b7e827aefefc37a5e48.png" alt="Brand 2" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/ORdvt5fk_bc0632552f024484b41ceb35c5904cd1.png" alt="Brand 3" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/9Ixl0see_6e0bfa321a3c44fba5c5200ec81f38c7.png" alt="Brand 4" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/FPDqi1sP_7a4a940f82a34052a857c9ec2f4e0b57.png" alt="Brand 5" style={{ width: '338px' }} />
                </Link>
              </div>
            </div>

            <div className="carousel-item">
              <div className="d-flex flex-wrap justify-content-center">
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/f_webp,w_78,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/30/e100389a-2d80-4893-8479-7bae253c21b71745952244433-image_png_1936649708.png" alt="Ima" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/zJLguZXd_0ffa495ed7d54ea98e2a9d86180432b4.png" alt="Ihjh" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/3bS6B1pe_e0d038b2610e44538bfdd489949cd7ab.png" alt="Imfd" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/GqKyT0sf_84de336d90aa4da0b6c9667470eea8af.png" alt="bbhjjh" style={{ width: '338px' }} />
                </Link>
                <Link to="/Product-list">
                  <img src="https://assets.myntassets.com/assets/images/2025/APRIL/29/DXSgHX1u_35e5b7c1e1d8446c8f4fe9ded2a785de.png" alt="bhjh" style={{ width: '330px' }} />
                </Link>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2 gap-3">
            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="0"
              className="btn btn-dark btn-sm rounded-circle p-0" aria-current="true" aria-label="Slide 1" style={{ width: '10px', height: '10px' }} >
            </button>

            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="1"
              className="btn btn-secondary btn-sm rounded-circle p-0" aria-label="Slide 2" style={{ width: '10px', height: '10px' }}>
            </button>

            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="2"
              className="btn btn-secondary btn-sm rounded-circle p-0" aria-label="Slide 3" style={{ width: '10px', height: '10px' }} >
            </button>

            <button type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide-to="3"
              className="btn btn-secondary btn-sm rounded-circle p-0" aria-label="Slide 4" style={{ width: '10px', height: '10px' }} >
            </button>
          </div>
        </div>
      </section>

      <section className='container-fluid pt-3' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className='col-12'>
          <img src='https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/28/c2023bb8-4eb2-41fd-abab-601749f028f41745831595417-Shop-By-Category.jpg' alt='img' className='img-fluid w-100' />
        </div>
      </section>


      {/* shop category */}

      <section className='container-fluid pt-3' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className='row'>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Female&brand=Ethics&category=Ethnic Skirts,Sarees,Lehengas,Salwar Suits,Bath Robe">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/dD6fxJHv_e02fd2a2b4a84a93842495abef63736f.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Male,Boys&brand=Adidas,Dennis Lingo,Roadster,Sgya&category=Tshirt">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/GMxB25MT_b9c51bdae0e148f48169f86646a94ac1.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Male,Boys&brand=Superdry,Reebok,Adidas,Sgya&category=Shorts,Track Suits,Track Pants,Shirt">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/UWAFD5lF_ac539043c2aa4a9a90718e0b25dde7d3.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Female,Girls&brand=Roadster,Reebok,Puma,Nike,Nike,Sgya&category=Sports Bra,Sports T-shirts,Sports Shorts,Yoga Pants,Tshirt">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/gUuzVQSl_2f820bb820ae48b794771b0e65352e99.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Female,Girls&brand=DressBerry,Roadster,Sgya&category=Blazers and Coats,Jeggings,Jeans,Blazers and Coats">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/1UtZ9noU_cb4d809cc67d42f69c2f94508fe6b417.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

          <div className='col-lg-2'>
            <Link to="/Product-list?gender=Boys,Girls&brand=Nike,Reebok,Puma&category=Track Pants,Crop Hoodies,Training Shorts,Sports T-shirts">
              <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/PKQMRsIz_e541173caed0458ea0160298966f914c.jpg' alt='img' className='img-fluid w-100' />
            </Link>
          </div>

        </div>
      </section>

      <section className='container-fluid pt-3' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className='col-lg-12'>
          <div className='row'>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Robe,Nightdresses,Sleepwear Sets,Robes">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/SE82ZwNc_6438828c408c46989fbf0a1948617d36.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=&brand=&category=">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/PLDvbVUV_d74e2c91f2824c57b7044e92d71d9dcc.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=&brand=&category=">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/HoXQEq4f_f2b2da1a10014e8794b72e4f5c71e609.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Watch">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/jOHGAN5d_5783fba50c844cec8ad1e3a63d10c756.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?category=Beauty">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/DD0YItR1_deb6fee179354de08e98bb78984eeb44.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Beauty">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/HtulIRa1_5f24ac751cec4eb18e0a2d6e63e29dcf.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

          </div>
        </div>
      </section>


      <section className='container-fluid pt-3' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className='col-lg-12'>
          <div className='row'>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=Kids&category=Tshirt,Shirt,Jeans">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/VezFx2xp_1baaff533c99451e95bf8c3af31f6918.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Shoes">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/jcRtjbHn_9bf359c7695a4f5f8e150bea5278b17d.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Heels,Flats,Casual Shoes">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/zyvSxeRn_c498d530021042df9b8da37e4e53c4ba.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Belts,Wallets,Bags">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/7uelhbvr_be876cb384434b08bed5ccc55aa0d935.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=Male,Female&category=Formal Shirts">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/hWA1O9Tl_92a85e926b4f497995ef32223a6bd826.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?&category=Kurtas,Kurta Sets,Sherwanis,Pathani Suits">
                <img src='https://assets.myntassets.com/f_webp,w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/R0Hmqvya_5079c6ddc83a41a186655644eccd8ed2.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* <section className='container-fluid pt-3' style={{ paddingLeft: '100px', paddingRight: '100px' }}>
        <div className='col-lg-12'>
          <div className='row justify-content-center'>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=Male,Boys&brand=Adidas,Nike,Puma&category=Shoes">
                <img src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/GhI2igNs_1b312bd5098d42fbb4a83fbaf6ea3f5f.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=Female&brand=Zara&category=Dress">
                <img src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/QAlWBgCS_18a9956f17e14dbe8fb517161dc3950e.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

            <div className='col-lg-2'>
              <Link to="/Product-list?gender=Men,Boys&brand=Puma&category=Shoes">
                <img src='https://assets.myntassets.com/f_webp,w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/mbpanmb6_f506c722798748c68f5ab1edfc61f1c9.jpg' alt='img' className='img-fluid w-100' />
              </Link>
            </div>

          </div>
        </div>
      </section> */}

      {/*  footer */}
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

export default Home;