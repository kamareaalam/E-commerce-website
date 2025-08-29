import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Orderconfirmation = () => {
  const [addcarts, setAddcart] = useState([]);
  const [webuser, setWebuser] = useState({
    fullname: '',
    mobileno: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    const storedWebuser = JSON.parse(localStorage.getItem('webuser'));
    if (storedWebuser) {
      setWebuser({
        _id: storedWebuser._id || '',
        fullname: storedWebuser.fullname || '',
        mobileno: storedWebuser.mobileno || '',
        pincode: storedWebuser.pincode || '',
        address: storedWebuser.address || '',
        city: storedWebuser.city || '',
        state: storedWebuser.state || '',
      });
    }
  }, []);

  const getCarts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/website/add/list');
      const result = await response.json();
      setAddcart(result.addcarts || result);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <>
      {/* Delivery Info */}
      <div className='container pt-3'>
        <div className='card shadow border-white'>
          <div className='card-body'>
            <div>Delivering to :</div>
            <div className='fw-bold'>
              <span>{webuser.fullname}</span> | <span>{webuser.mobileno}</span>
            </div>
            <div>
              {webuser.address}, {webuser.city}, {webuser.state}, {webuser.pincode}
            </div>

            {/* <div className='container pt-4'>
              <div className='row'>
                <div className='col-sm-2'>
                  <div className='card border border-danger bg-white'>
                    <Link>
                      <div className='card-body d-flex align-items-center gap-3'>
                        <div className='fw-medium text-danger'>ORDER DETAILS</div>
                        <i className='fa-solid fa-chevron-right text-danger' style={{ fontSize: '16px' }}></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div> */}

            <hr />
          </div>
        </div>
      </div>


      <div className='container pt-3'>
        <div className='card shadow border-white'>
          <div className='card-body'>
            <div className='fw-medium'>Tag your Purchase</div>
          </div>

          {addcarts.map((item, index) => (
            <div key={index} className='card shadow border-white mb-3'>
              <div className='card-body d-flex align-items-center flex-wrap'>
                <div className='me-4'>
                  {item.productphotourl ? (
                    <img
                      src={item.productphotourl}
                      alt={item.productname}
                      style={{ width: '150px', height: '150px', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ width: '150px', height: '150px', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      No Image
                    </div>
                  )}
                </div>
                <div className='flex text-center text-md-start mt-md-0 mt-3'>
                  <h5>{item.productname}</h5>
                  <p className='mb-1'>Size: {item.productsize}</p>
                  <p className='mb-1 text-success fw-bold'>
                    Arriving by {moment(item.createdAt).add(3, 'days').format('ddd, MMM Do')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div className='container pt-3'>
        <div className='card shadow border-white'>
          <div className='card-body'>
            <div className='fw-bold'>Now pay at your convenience</div>
            <div>
              Now you can pay online using Pay Now option from orders or you can Pay on Delivery (Cash/UPI)
            </div>
          </div>

          <div className='d-flex align-items-center my-4'>
            <div className='flex-grow-1 border-top border-dark'></div>
            <div className='px-3 fw-medium text-center'>Keep creating your wardrobe</div>
            <div className='flex-grow-1 border-top border-dark'></div>
          </div>

          <div className='d-flex justify-content-center my-3'>
            <Link to="/Product-list">
              <button className='btn bg-white border-dark fw-medium'>CONTINUE SHOPPING</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderconfirmation;
