import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [emailid, setEmailid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!emailid || !password) {
      return alert("Please fill in both fields.");
    }

    try {
      const res = await fetch("http://localhost:4000/api/website/userlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok && data.success) {
        localStorage.setItem("user", JSON.stringify(data.data));
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/admin/dashboard");
      } else {
        alert(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Oops! Something went wrong. Please try again later.");
    }
  };

  return (
    <div className='row pt-5'>
      <div className='col-lg-4'></div>
      <div className='col-lg-4'>
        <div className='card'>
          <div className='card-body p-4'>
            <h4>Hello! Let's get started</h4>
            <h6 className="font-weight-light">Login to continue.</h6>

            <div className="form-group my-3">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email id"
                value={emailid}
                onChange={(e) => setEmailid(e.target.value)}
              />
            </div>
            <div className="form-group my-3">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className='btn btn-primary btn-lg w-100'
              onClick={handleLogin}
            >
              LOGIN
            </button>

            <div className="d-flex justify-content-between align-items-center my-3">
              <div>
                <input type="checkbox" /> <span className="text-muted">Keep me logged in</span>
              </div>
              <Link to="/admin/change-password" className="text-primary">
                Forgot password?
              </Link>
            </div>

          </div>
        </div>
      </div>
      <div className='col-lg-4'></div>
    </div>
  );
};

export default Login;
