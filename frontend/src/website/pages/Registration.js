import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
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

  const submit = async () => {
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

        // Clear form data
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

        navigate("/User-profile");
      } else {
        alert("Error: " + (result.message || "Failed to submit"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const location = useLocation();
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

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6 p-3 shadow rounded">
          <h3 className="text-center text-danger mb-4">
            <i className="fa fa-user-plus"></i> {selectedId ? "Edit Profile" : "Add Profile"}
          </h3>

          <div className="row mb-4">
            <div className="col-lg-3">Full Name</div>
            <div className="col-lg-9"><input type="text" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">Mobile No</div>
            <div className="col-lg-9"><input type="number" className="form-control" value={mobileno} onChange={(e) => setMobileno(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">e-mail Id</div>
            <div className="col-lg-9"><input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">Password</div>
            <div className="col-lg-9"><input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">Date of Birth</div>
            <div className="col-lg-9"><input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">Address</div>
            <div className="col-lg-9"><textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)}></textarea></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">Pincode</div>
            <div className="col-lg-9"><input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">City</div>
            <div className="col-lg-9"><input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-3">State</div>
            <div className="col-lg-9"><input type="text" className="form-control" value={state} onChange={(e) => setState(e.target.value)} /></div>
          </div>

          <div className="text-center">
            <button className={`btn ${selectedId ? "btn-success" : "btn-info"} m-2`} onClick={submit}>
              
              {selectedId ? "Update" : "Submit"}
            </button>
          </div>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default Registration;
