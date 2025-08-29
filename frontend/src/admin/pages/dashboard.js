import React from 'react';
import { Link } from 'react-router-dom';
// import { GoHome } from "react-icons/go";
const Dashboard = () => {
    return (
        <>
        
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 >Dashboard</h2>
                    </div>
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow rounded h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Dashboard</h3>
                                    <p className="card-text">Manage your website settings here.</p>
                                    <Link to="" className="btn btn-success">Go to Dashboard</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow rounded h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Manage Categories</h3>
                                    <p className="card-text">Organize and update your product categories.</p>
                                    <Link to="/admin/manage-categories" className="btn btn-info">Categories</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow rounded h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Manage Orders</h3>
                                    <p className="card-text">View and manage customer orders.</p>
                                    <Link to="/admin/manage-order" className="btn btn-danger">Orders</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="card shadow rounded h-100">
                                <div className="card-body text-center">
                                    <h3 className="card-title">Manage User</h3>
                                    <p className="card-text">Organize and update your product User.</p>
                                    <Link to="/admin/manage-user" className="btn btn-info">Categories</Link>
                                </div>
                            </div>
                        </div>
                    </div>
            
        </>
    );
};

export default Dashboard;


