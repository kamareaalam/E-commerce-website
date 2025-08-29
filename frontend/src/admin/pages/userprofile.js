import React, { useEffect, useState } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState({
        fullname: '',
        mobileno: '',
        emailid: '',
        dateofbirth: '',
        address: '',
        pincode: '',
        city: '',
        state: '',
        role: '',
        status: '',
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser({
                    fullname: parsedUser.fullname || '',
                    mobileno: parsedUser.mobileno || '',
                    emailid: parsedUser.emailid || '',
                    dateofbirth: parsedUser.dateofbirth || '',
                    address: parsedUser.address || '',
                    pincode: parsedUser.pincode || '',
                    city: parsedUser.city || '',
                    state: parsedUser.state || '',
                    role: parsedUser.role || '',
                    status: parsedUser.status || '',
                });
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, []);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User Profile Details</h2>
            </div>

            <div className="card mb-4">
                <div className="card-body cardbody">
                    <div className="row">
                        <div className="col-md-3 col-sm-12 text-center">
                            <img className="pro-img img-thumbnail" src="default.jpeg" alt="Profile" />
                        </div>

                        <div className="col-lg-9 col-sm-12 datadiv">
                            <div className="row rowdiv">
                                <div className="col-md-3 labe">Full Name</div>
                                <div className="col-md-3">{user.fullname}</div>
                                <div className="col-md-3 labe">Mobile No</div>
                                <div className="col-md-3">{user.mobileno}</div>
                            </div>

                            <div className="row rowdiv">
                                <div className="col-md-3 labe">Email</div>
                                <div className="col-md-3">{user.emailid}</div>
                                <div className="col-md-3 labe">DOB</div>
                                <div className="col-md-3">{user.dateofbirth}</div>
                            </div>

                            <div className="row rowdiv">
                                <div className="col-md-3 labe">Address</div>
                                <div className="col-md-3">{user.address}</div>
                                <div className="col-md-3 labe">Pincode</div>
                                <div className="col-md-3">{user.pincode}</div>
                            </div>

                            <div className="row rowdiv">
                                <div className="col-md-3 labe">City</div>
                                <div className="col-md-3">{user.city}</div>
                                <div className="col-md-3 labe">State</div>
                                <div className="col-md-3">{user.state}</div>
                            </div>

                            <div className="row rowdiv">
                                <div className="col-md-3 labe">Role</div>
                                <div className="col-md-3">{user.role}</div>
                                <div className="col-md-3 labe">Status</div>
                                <div className="col-md-3">
                                    <button className={`btn btn-sm ${user.status.toLowerCase() === 'active' ? 'btn-success' : 'btn-danger'} `}>
                                        {user.status}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
