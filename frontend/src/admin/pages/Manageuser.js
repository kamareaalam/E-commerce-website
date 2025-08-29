import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import ReactPaginate from "react-paginate"; 
import { useNavigate } from 'react-router-dom';
const Manageuser = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    const handleEdit = (user) => {
        navigate('/admin/create-user', { state: { user } });
    };


    const getUsers = async() => {
        fetch("http://localhost:4000/api/website/createuser/list")
            .then(response => response.json())
            .then(userArray => {
                setUserList(userArray);
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/website/createuser/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // setUserList(userList.filter(user => user._id !== id)); 
                await getUsers();
                console.log('User deleted successfully');
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const PER_PAGE = 10; //displays 10 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(userList.length / PER_PAGE);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Manage Users</h2>
                <Link to="/admin/create-user">
                    <button className="btn btn-secondary">
                        <i className="fa fa-plus"></i> Add Users
                    </button>
                </Link>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered table-hover">
                            <thead className="table-dark">
                                <tr className='text-center'>
                                    <th>S.NO</th>
                                    <th>Full Name</th>
                                    <th>Mobile Number</th>
                                    <th>Email Id</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    {/* <th>Password</th> */}
                                    {/* <th>Date of Birth</th> */}
                                    <th>Address</th>
                                    {/* <th>Pincode</th>
                                    <th>State</th>
                                    <th>City</th> */}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userList.slice(offset, offset + PER_PAGE).map((user, index) => (
                                    <tr className='text-center' key={user._id}>
                                        <td>{index + 1}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.mobileno}</td>
                                        <td>{user.emailid}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                        {/* <td>{user.password}</td> */}
                                        {/* <td>{user.dateofbirth}</td> */}
                                        <td>{user.address},  {user.city},  {user.state},  {user.pincode}</td>
                                        {/* <td>{user.pincode}</td>
                                        <td>{user.state}</td>
                                        <td>{user.city}</td> */}
                                        <td>
                                        <button className="btn btn-info me-2" onClick={() => handleEdit(user)}>
                                            <i className="fa fa-edit"></i> Edit
                                        </button>
                                        <button className="btn btn-danger" onClick={(e) => deleteUser(user._id)} >
                                            <i className="fa fa-trash"></i> Delete
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-5 text-center">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={1}
                                pageRangeDisplayed={2}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
                                pageClassName={"page-item "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manageuser;
