import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import image from '../../Assits/myntra-logo-freelogovectors.net_.png';
import { FaUserAlt } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Layout = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNav = () => {
        setIsOpen(!isOpen);
    };

    const logout = async () => {
        const token = localStorage.getItem("token");
        const userJson = localStorage.getItem("user");
        const user = userJson ? JSON.parse(userJson) : null;

        if (!token || !user) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            alert("Logout successful");
            navigate("/admin/login");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/api/website/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ id: user._id })
            });
            const result = await res.json();

            if (res.ok) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                alert("Logout successful");
                navigate("/admin/login");
            } else {
                alert(result.message || "Logout failed");
            }
        } catch (error) {
            alert("Logout failed: " + error.message);
        }
    };






    return (
        <>
        {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={image} alt="Logo" style={{ width: '50px', marginLeft: '60px' }} className="rounded-pill" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown fs-5">
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" style={{ marginRight: '70px' }}>
                                    <FaUserAlt /> Profile
                                </Link>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to="/admin/user-profile"> My Profile</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/change-password">Change Password</Link></li>
                                    <li><Link className="dropdown-item" to="/admin/login" onClick={logout}><IoMdLogOut /> Logout</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* SIDE NAVBAR */}
            <div id="mySidenav" className="sidenav" style={{
                width: isOpen ? '250px' : '0', transition: '0.5s', zIndex: 999, position: 'fixed',
                height: '100%', backgroundColor: 'black', color: 'white', paddingTop: '60px', overflowX: 'hidden'
            }}>
                <Link to="/admin/Dashboard" className="d-block text-white p-3">Dashboard</Link>
                <Link to="/admin/manage-categories" className="d-block text-white p-3">Manage Product</Link>
                <Link to="/admin/manage-order" className="d-block text-white p-3">Manage Orders</Link>
                <Link to="/admin/manage-user" className="d-block text-white p-3">Manage Users</Link>
            </div>

            <div id="main" style={{ marginLeft: isOpen ? '250px' : '0', transition: '0.5s' }}>
                <button className="btn btn-secondary mb-3" style={{ fontSize: '15px', cursor: 'pointer', position: 'absolute', top: '10px', left: isOpen ? '10px' : '10px', zIndex: 1000 }} onClick={toggleNav} aria-label="Toggle Sidebar" >
                    &#9776;
                </button>

                <div className="container-fluid" >
                    <div className='main-panel'>
                        <div className='content-wrapper'>
                            {/* Dynamic page rendering */}
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;


