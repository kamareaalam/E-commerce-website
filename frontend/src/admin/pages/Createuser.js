import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const CreateUser = () => {
    const navigate = useNavigate(); 
    const [fullname, setName] = useState('');
    const [mobileno, setMobile] = useState('');
    const [emailid, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateofbirth, setBirth] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('');
    const [selectedId, setSelectedId] = useState(null);


    const save = async () => {
        try {
            const url = selectedId
                ? `http://localhost:4000/api/website/createuser/update/${selectedId}`
                : "http://localhost:4000/api/website/createuser";

            const method = selectedId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, mobileno, emailid, password, dateofbirth, address, pincode, state, city, role, status }),
            });

            const result = await response.json();
            if (response.ok) {
                const updatedUser = { fullname, mobileno, emailid, password, dateofbirth, address, pincode, state, city, role, status };
                localStorage.setItem("user", JSON.stringify(updatedUser)); 

                alert(selectedId ? "User updated successfully!" : "User created successfully!");

                // Clear form fields
                setName("");
                setMobile("");
                setEmail("");
                setPassword("");
                setBirth("");
                setAddress("");
                setPincode("");
                setState("");
                setCity("");
                setRole("");
                setStatus("");
                setSelectedId(null);

                navigate('/admin/manage-user');
            } else {
                alert(result.message || "Something went wrong!");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const location = useLocation();
    const editingUser = location.state?.user || null;

    useEffect(() => {
        if (editingUser) {
            setSelectedId(editingUser._id);
            setName(editingUser.fullname);
            setMobile(editingUser.mobileno);
            setEmail(editingUser.emailid);
            setPassword(editingUser.password);
            setBirth(editingUser.dateofbirth);
            setAddress(editingUser.address);
            setPincode(editingUser.pincode);
            setState(editingUser.state);
            setCity(editingUser.city);
            setRole(editingUser.role);
            setStatus(editingUser.status);
        }
    }, [editingUser]);


    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>{selectedId ? "Edit User Profile" : "Add User Profile"}</h2>
                <Link to="/admin/manage-user">
                    <button className="btn btn-secondary">
                        <i className="fa fa-plus"></i> Manage Users
                    </button>
                </Link>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-3 text-center mb-4">
                            <img src="https://via.placeholder.com/150" className="img-thumbnail mb-3" alt="Profile" />
                            <input type="file" className="form-control" />
                            <small className="text-muted">Upload profile picture</small>
                        </div>
                        <div className="col-lg-9">
                            <div className="row mb-3 position-relative">
                                <div className="col-lg-3">Full Name</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={fullname} onChange={(e) => { setName(e.target.value);}}/>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Mobile No</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={mobileno} onChange={(e) => setMobile(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Email ID</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={emailid} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Password</div>
                                <div className="col-lg-9">
                                    <input type="password" className="form-control" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Date of Birth</div>
                                <div className="col-lg-9">
                                    <input type="date" className="form-control" value={dateofbirth} onChange={(e) => setBirth(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Full Address</div>
                                <div className="col-lg-9">
                                    <textarea className="form-control" rows="2" value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Pincode</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">City</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">State</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Role</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-lg-3">Status</div>
                                <div className="col-lg-9">
                                    <input type="text" className="form-control" value={status} onChange={(e) => setStatus(e.target.value)} />
                                </div>
                            </div>

                            <div className="text-center">
                                <button className={selectedId ? 'btn btn-success' : 'btn btn-info'} onClick={save}>
                                    {selectedId ? "Update User" : "Save User"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateUser;