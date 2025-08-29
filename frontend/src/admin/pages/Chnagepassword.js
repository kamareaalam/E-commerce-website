import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
    const navigate = useNavigate("");
    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    const userJson = localStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const userId = user?._id;

    const updatePassword = async () => {
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        if (newpassword !== confirmpassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/website/userlogin/update/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldpassword: (oldpassword), newpassword: (newpassword) }),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Password updated successfully.");
                setOldpassword("");
                setNewpassword("");
                setConfirmpassword("");
                navigate("/admin/dashboard");
            } else {
                alert(result.message || "Failed to update password.");
            }
        } catch (error) {
            alert("Something went wrong while updating the password.");
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                    <div className="card shadow-lg border-0 animate-form">
                        <div className="card-body p-4 p-md-5">
                            <h3 className="text-center mb-4 text-primary fw-bold">Change Password</h3>
                            <div className="mb-4">
                                <label htmlFor="oldpassword" className="form-label fw-semibold">Old Password</label>
                                <input type="password"className="form-control form-control-lg rounded-pill" id="oldpassword"
                                 placeholder="Enter old password" value={oldpassword} onChange={(e) => setOldpassword(e.target.value)} required/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="newpassword" className="form-label fw-semibold">New Password</label>
                                <input type="password" className="form-control form-control-lg rounded-pill" id="newpassword" placeholder="Enter new password" value={newpassword} onChange={(e) => setNewpassword(e.target.value)}required />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirmpassword" className="form-label fw-semibold">Confirm Password</label>
                                <input type="password" className="form-control form-control-lg rounded-pill" id="confirmpassword" placeholder="Confirm new password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} required />
                            </div>
                            <div className="d-grid">
                                <button type="button" className="btn btn-success btn-lg rounded-pill fw-semibold" onClick={updatePassword} >Update Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
