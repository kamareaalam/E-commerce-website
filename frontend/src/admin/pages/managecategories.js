import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from "react-paginate";

const ManageCategories = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/website/addnewproduct/list");
      const result = await response.json();
      setProducts(result.products || result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteCategory = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/website/addnewproduct/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await getProducts();
        console.log("Product deleted successfully");
      } else {
        console.log("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    navigate('/admin/addnewproduct', { state: { product } });
  };

  const PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(products.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Link to="/admin/addnewproduct">
          <button className="btn btn-success">
            <i className="fa fa-plus"></i> Add New Product
          </button>
        </Link>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="table-dark text-center">
                <tr>
                  <th>S.NO</th>
                  <th>Photo</th>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Original Price</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Brand</th>
                  <th>Gender</th>
                  <th>Country</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.slice(offset, offset + PER_PAGE).map((product, index) => (
                    <tr className="text-center" key={product._id}>
                      <td>{offset + index + 1}</td>
                      <td>
                        <img src={product.productphotourl} height="80" width="100" alt={product.productname} style={{ objectFit: "cover" }} />
                      </td>
                      <td>{product.productcategory}</td>
                      <td>{product.productname}</td>
                      <td>₹{product.productprice}</td>
                      <td>₹{product.productoriginalprice}</td>
                      <td>{product.productsize}</td>
                      <td>{product.color}</td>
                      <td>{product.brand}</td>
                      <td>{product.gender}</td>
                      <td>{product.country}</td>
                      <td style={{ maxWidth: "200px", whiteSpace: "pre-wrap",}}>{product.productdescription}</td>
                      <td>
                        <button className="btn btn-info me-2" onClick={() => handleEdit(product)}>
                          <i className="fa fa-edit"></i> Edit
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteCategory(product._id)}>
                          <i className="fa fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>

            <div className="mt-4 text-center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCategories;
