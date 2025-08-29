import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Addnewproduct = () => {
    const navigate = useNavigate("");
    const [productcategory, setPcategory] = useState("");
    const [productname, setPname] = useState("");
    const [productprice, setPprice] = useState("");
    const [productoriginalprice, setProductoriginalPrice] = useState("");
    const [productsize, setSize] = useState("");
    const [productphotourl, setPphotourl] = useState("");
    const [productdescription, setDescription] = useState("");
    const [color, setColor] = useState("");
    const [gender, setGender] = useState("");
    const [brand, setBrand] = useState("");
    const [country, setCountry] = useState("");
    const [bundle, setBundle] = useState("");
    // const [discount, setDiscount] = useState("")
    const [selectedId, setSelectedId] = useState(null);

    const save = async () => {
        try {
            if (!productcategory || !productname || !productprice || !productoriginalprice || !productsize || !productphotourl || !productdescription || !color || !gender || !brand || !country || !bundle ) {
                alert("Please fill all fields!");
                return;
            }
            const url = selectedId
                ? `http://localhost:4000/api/website/addnewproduct/updateproduct/${selectedId}`
                : "http://localhost:4000/api/website/addnewproduct";

            const method = selectedId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productcategory, productname, productprice, productoriginalprice, productsize, productphotourl, productdescription, color, gender, brand, country, bundle,  }),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                alert(selectedId ? "Product updated successfully!" : "Product added successfully!");
                setPcategory("");
                setPname("");
                setPprice("");
                setProductoriginalPrice("");
                setSize("");
                setPphotourl("");
                setDescription("");
                setColor("");
                setGender("");
                setBrand("");
                setCountry("");
                setBundle("");
                // setDiscount("");
                setSelectedId(null);
                navigate('/admin/manage-categories');
            } else {
                alert(result.message || "Something went wrong!");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };


    const location = useLocation();
    const editingProduct = location.state?.product || null;

    useEffect(() => {
        if (editingProduct) {
            setSelectedId(editingProduct._id);
            setPcategory(editingProduct.productcategory);
            setPname(editingProduct.productname);
            setPprice(editingProduct.productprice);
            setProductoriginalPrice(editingProduct.productoriginalprice);
            setSize(editingProduct.productsize);
            setPphotourl(editingProduct.productphotourl);
            setDescription(editingProduct.productdescription);
            setColor(editingProduct.color);
            setBrand(editingProduct.brand);
            setGender(editingProduct.gender);
            setCountry(editingProduct.country);
            setBundle(editingProduct.bundle);
            // setDiscount(editingProduct.discount);
        }
    }, [editingProduct]);

    return (
        <>
            <div className="container">
                <div className="row mt-3">
                    <div className="col-xl-12 text-center">
                        <h1 className="text-info">{selectedId ? " Update Product" : "Add New Porduct"}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3">
                        <p>Product Category <span className="text-danger">*</span></p>
                        <input type="text" className="form-control" onChange={(e) => setPcategory(e.target.value)} value={productcategory} />
                    </div>
                    <div className="col-xl-3">
                        <p>Product Name <span className="text-danger">*</span></p>
                        <input type="text" className="form-control" onChange={(e) => setPname(e.target.value)} value={productname} />
                    </div>
                    <div className="col-xl-3">
                        <p>Product Color <span className="text-danger">*</span></p>
                        <select className="form-control" onChange={(e) => setColor(e.target.value)} value={color}>
                            <option value="">-- Select Color --</option>
                            <option value="Red">Red</option>
                            <option value="Blue">Blue</option>
                            <option value="Black">Black</option>
                            <option value="Pink">Pink</option>
                            <option value="Green">Green</option>
                            <option value="White">White</option>
                            <option value="Yellow">Yellow</option>
                            <option value="Orange">Orange</option>
                        </select>
                    </div>
                    <div className="col-xl-3">
                        <p>Product Brand <span className="text-danger">*</span></p>
                        <input type="text" className="form-control" onChange={(e) => setBrand(e.target.value)} value={brand} />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-xl-3">
                        <p>Product Price <span className="text-danger">*</span></p>
                        <input type="number" className="form-control" onChange={(e) => setPprice(e.target.value)} value={productprice} />
                    </div>
                    <div className="col-xl-3">
                        <p>Product Original Price <span className="text-danger">*</span></p>
                        <input type="number" className="form-control" onChange={(e) => setProductoriginalPrice(e.target.value)} value={productoriginalprice} />
                    </div>
                    {/* <div className="col-xl-3">
                        <p>Discount <span className="text-danger">*</span></p>
                        <input type="number" className="form-control" onChange={(e) => setDiscount(e.target.value)} value={discount} />
                    </div> */}

                    <div className="col-xl-3">
                        <p>Country <span className="text-danger">*</span></p>
                        <select className="form-control" onChange={(e) => setCountry(e.target.value)} value={country}>
                            <option value="">-- Select Country --</option>
                            <option value="India">India</option>
                            <option value="China">China</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="America">America</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-xl-3">
                        <p>Product Size <span className="text-danger">*</span></p>
                        <select className="form-control" onChange={(e) => setSize(e.target.value)} value={productsize}>
                            <option value="">-- Select Size --</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="Free Size">Free Size</option>
                        </select>
                    </div>

                    <div className="col-xl-3">
                        <p>Bundles <span className="text-danger">*</span></p>
                        <select className="form-control" onChange={(e)=> setBundle(e.target.value)} value={bundle}>
                            <option value="">-- Select Bundle Type --</option>
                            <option value="Bundles">Bundles</option>
                            <option value="Single style">Single style</option>
                        </select>
                    </div>

                    <div className="col-xl-3">
                        <p>Gender <span className="text-danger">*</span></p>
                        <select className="form-control" onChange={(e) => setGender(e.target.value)} value={gender}>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Boys">Boys</option>
                            <option value="Girls">Girls</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>

                    <div className="col-xl-3">
                        <p>Product Photo URL <span className="text-danger">*</span></p>
                        <input type="text" className="form-control" onChange={(e) => setPphotourl(e.target.value)} value={productphotourl} />
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className="col-xl-6 mx-auto">
                        <p>Product Description <span className="text-danger">*</span></p>
                        <textarea className="form-control" onChange={(e) => setDescription(e.target.value)} value={productdescription} />
                    </div>
                </div>


                <div className="row mt-4">
                    <div className="col-xl-4 offset-4 text-center">
                        <button className={selectedId ? 'btn btn-success' : 'btn btn-info'} onClick={save}>
                            {selectedId ? "Update Product" : "Save Product"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Addnewproduct;
