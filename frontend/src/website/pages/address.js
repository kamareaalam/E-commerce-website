import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../Assits/myntra-logo-freelogovectors.net_.png'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
const Address = () => {
    const [addcarts, setAddcart] = useState([]);
    const [selectedQty, setSelectedQty] = useState({});
    const [fullname, setFullname] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [selectedId, setSelectedId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const location = useLocation();
    const navigate = useNavigate()

    const editWebuser = location.state?.webuser || null;

    useEffect(() => {
        if (editWebuser) {
            setSelectedId(editWebuser._id);
            setFullname(editWebuser.fullname);
            setMobileno(editWebuser.mobileno);
            setEmail(editWebuser.email);
            setPassword(editWebuser.password);
            setDob(editWebuser.dob);
            setAddress(editWebuser.address);
            setPincode(editWebuser.pincode);
            setCity(editWebuser.city);
            setState(editWebuser.state);
        }
    }, [editWebuser]);

    const submit = async (e) => {
        e.preventDefault();
        try {
            const url = selectedId
                ? `http://localhost:4000/api/website/register/update/${selectedId}`
                : "http://localhost:4000/api/website/register";

            const method = selectedId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, mobileno, email, password, dob, address, pincode, city, state }),
            });
            const result = await response.json();
            if (response.ok) {
                alert(selectedId ? "Profile updated successfully" : "User registered successfully");

                const updatedRegister = { _id: selectedId, fullname, mobileno, email, password, dob, address, pincode, city, state };
                localStorage.setItem("webuser", JSON.stringify(updatedRegister));
                setWebuser(updatedRegister);

                // Clear form
                setFullname("");
                setMobileno("");
                setEmail("");
                setPassword("");
                setDob("");
                setAddress("");
                setPincode("");
                setCity("");
                setState("");
                setSelectedId(null);
                setShowForm(false);

            } else {
                alert("Error: " + (result.message || "Failed to submit"));
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

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

    const [webuser, setWebuser] = useState({
        fullname: '',
        mobileno: '',
        pincode: '',
        address: '',
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
                pincode: storedWebuser.pincode || '',
                address: storedWebuser.address || '',
                city: storedWebuser.city || '',
                state: storedWebuser.state || '',
            });
        }
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

    const handleToggleForm = () => {
        setShowForm((prev) => !prev);
    };

    const getClass = (path) => {
        const currentPath = location.pathname;
        if (path === currentPath) return 'step active';
        if (
            (path === '/User-cart' && (currentPath === '/address' || currentPath === '/checkout-page')) ||
            (path === '/address' && currentPath === '/checkout-page')
        ) return 'step completed';
        return 'step';
    };

    const placeorder = async () => {
    const orderId = `ORD-${Date.now()}`;

    const orderItems = addcarts.map(cart => ({
        orderId,
        productId: cart.productid || cart._id,
        name: cart.productname,
        photo: cart.productphotourl,
        size: cart.productsize,
        description: cart.productdescription,
        quantity: getQty(cart),
        price: cart.productprice,
    }));

    const orderData = {
        orderId,
        items: orderItems,
        totalAmount: finalAmount,
        address: {
            name: webuser.fullname,
            mobileno: webuser.mobileno,
            pincode: webuser.pincode,
            address: webuser.address,
            city: webuser.city,
            state: webuser.state,
        },
    };

    try {
        const response = await fetch("http://localhost:4000/api/website/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (response.ok) {
            localStorage.setItem("ordersData", JSON.stringify(result.order));
            Swal.fire({
                title: "Order placed successfully!",
                text: "Do you want to view your orders?",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
            }).then((res) => {
                if (res.isConfirmed) {
                    navigate("/checkout-page");
                } 
            });
        } else {
            Swal.fire("Failed to place order: " + result.error);
        }
    } catch (error) {
        Swal.fire("Error: " + error.message);
    }
};





    return (
        <>
            <section className="bg-white shadow-sm py-2" style={{ position: 'sticky', top: '0', zIndex: '9999' }}>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid px-3 px-lg-4">

                        <Link className="navbar-brand me-3" to="/">
                            <img src={image} alt="Myntra"
                                style={{ width: '50px', marginLeft: '50px' }} className="rounded-pill" />
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

            <div className='container pt-4 postion-relative'>
                <div className='row'>
                    <div className='col-xl-8 mb-4'>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Select Delivery Address</div>
                            <button onClick={handleToggleForm}
                                style={{ border: '1px solid black', borderRadius: '6px', height: '35px', padding: '0 12px', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold' }}>
                                {/* {showForm ? 'CLOSE FORM' : 'ADD NEW ADDRESS'} */}
                                ADD NEW ADDRESS
                            </button>
                        </div>

                        {showForm && (
                            <div
                                className="border p-3 rounded bg-light mb-2 shadow position-absolute"
                                style={{ top: '60px', margin: '35px 457px', zIndex: '1000', width: '400px' }}
                            >
                                <h5 className="mb-3">Add New Address</h5>
                                <form onSubmit={submit}>
                                    <div className="row">
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Full Name*</label>
                                            <input type="text" className="form-control" onChange={(e) => setFullname(e.target.value)} value={fullname} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Mobile No*</label>
                                            <input type="tel" className="form-control" maxLength="10" onChange={(e) => setMobileno(e.target.value)} value={mobileno} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Email*</label>
                                            <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Password*</label>
                                            <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">DOB*</label>
                                            <input type="text" className="form-control" onChange={(e) => setDob(e.target.value)} value={dob} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Pin Code*</label>
                                            <input type="tel" className="form-control" maxLength="6" onChange={(e) => setPincode(e.target.value)} value={pincode} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">Address*</label>
                                            <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} value={address} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">City / District*</label>
                                            <input type="text" className="form-control" onChange={(e) => setCity(e.target.value)} value={city} />
                                        </div>
                                        <div className="mb-2 col-12">
                                            <label className="form-label">State*</label>
                                            <input type="text" className="form-control" onChange={(e) => setState(e.target.value)} value={state} />
                                        </div>
                                        <div className="d-flex justify-content-between col-12">
                                            <button type="button" className="btn btn-outline-secondary" onClick={handleToggleForm}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Save Address</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}
                        <div>
                            <div className='mb-2'>DEFAULT ADDRESS</div>
                        </div>
                        <div className='card' >
                            <div className='card-body' style={{ marginTop: '0px' }}>
                                <div className='d-flex gap-2  mb-2'>
                                    <h5>{webuser.fullname}</h5>
                                    <button style={{ border: '1px solid green', borderRadius: '25px', color: 'green' }}>Home</button>
                                </div>
                                <div>{webuser.address}, {webuser.city} </div>
                                <div className='mb-3'>{webuser.city}, {webuser.state}- {webuser.pincode} </div>
                                <div className='mb-3'>Mobile: {webuser.mobileno} </div>
                                <div className='mb-3'> Pay on Delivery not availble </div>
                                <div className="d-flex gap-3">
                                    <button style={{ border: '1px solid black', borderRadius: '6px', height: '35px', padding: '0 16px', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold', }}>
                                        Remove
                                    </button>
                                    <button
                                        style={{ border: '1px solid black', borderRadius: '6px', height: '35px', padding: '0 16px', backgroundColor: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                                        onClick={() => {
                                            setSelectedId(webuser._id);
                                            setFullname(webuser.fullname);
                                            setMobileno(webuser.mobileno);
                                            setEmail(webuser.email);
                                            setPassword(webuser.password);
                                            setDob(webuser.dob);
                                            setPincode(webuser.pincode);
                                            setAddress(webuser.address);
                                            setCity(webuser.city);
                                            setState(webuser.state);
                                            setShowForm(true);
                                        }} >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
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
                                <button
                                    className="btn btn-danger btn-lg w-100 mt-4"
                                    onClick={() => {
                                        localStorage.setItem("selectedQty", JSON.stringify(selectedQty));
                                        placeorder(); }} >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container mb-4' style={{ marginTop: '-40px' }}>
                <div className='row'>
                    <div className='col-xl-8'>
                        {/* <Link to="" style={{ textDecoration: 'none' }}> */}
                        <div className='card' style={{ border: '1.5px dotted', textDecoration: 'none', cursor: 'pointer' }}>
                            <div className='card-body'>
                                <div className="add d-flex align-items-center gap-1">
                                    <div className="add-icon">
                                        <i className="fa-solid fa-plus" style={{ fontSize: '16px', color: 'red' }}></i>
                                    </div>
                                    <div className="address-text text-danger fw-bold" style={{ fontSize: '18px' }} onClick={handleToggleForm}>
                                        ADD NEW ADDRESS
                                        {/* {showForm ? 'ADD NEW ADDRESS' : 'ADD NEW ADDRESS'} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
            <hr />

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

export default Address

