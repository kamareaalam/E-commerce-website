import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

// Pages and components
import Addnewproduct from './admin/pages/addnewproduct';
import Changepassword from './admin/pages/Chnagepassword';
import Createuser from './admin/pages/Createuser';
import Dashboard from './admin/pages/dashboard';
import Layout from './admin/pages/Layout';
import Login from './admin/pages/login';
import ManageCategories from './admin/pages/managecategories';
import ManageOrder from './admin/pages/manageorder';
import Manageuser from './admin/pages/Manageuser';
import UserProfile from './admin/pages/userprofile';

import Address from './website/pages/address';
import CheckoutPage from './website/pages/Checkoutpage';
import ContactUs from './website/pages/Contactus';
import Home from './website/pages/Home';
import WebsiteLogin from './website/pages/Login';
import WebsiteChangePassword from './website/pages/Changepaswword';
import OrderConfirmation from './website/pages/Orderconfirmation';
import ProductDetail from './website/pages/Productdetail';
import ProductList from './website/pages/Productlist';
import Registration from './website/pages/Registration';
import TermCondition from './website/pages/Termcondition';
import UserCart from './website/pages/Usercart';
import UserOrderDetail from './website/pages/Userorderdetail';
import UserOrderList from './website/pages/Userorderlist';
import UserWishList from './website/pages/Userwishlist';
import WebsiteUserProfile from './website/pages/Userprofile';
import ReturnPolicy from './website/pages/Returnpolicy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<Layout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/addnewproduct" element={<Addnewproduct />} />
            <Route path="manage-categories" element={<ManageCategories />} />
            <Route path="manage-order" element={<ManageOrder />} />
            <Route path="/admin/manage-user" element={<Manageuser />} />
            <Route path="/admin/user-profile" element={<UserProfile />} />
            <Route path="/admin/change-password" element={<Changepassword />} />
            <Route path="/admin/create-user" element={<Createuser />} />
            <Route path="/admin/login" element={<Login />} />
          </Route>

          {/* Other Website Routes */}
          <Route path="/address" element={<Address />} />
          <Route path="/checkout-page" element={<CheckoutPage />} />
          <Route path="/Contact-us" element={<ContactUs />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route path="/website-login" element={<WebsiteLogin />} />
          <Route path="/website/changepassword" element={<WebsiteChangePassword />} />
          <Route path="/Order-confirmation" element={<OrderConfirmation />} />
          <Route path="/Product-detail/:id" element={<ProductDetail />} />
          <Route path="/Product-list" element={<ProductList />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/Return-policy" element={<ReturnPolicy />} />
          <Route path="/Term-condition" element={<TermCondition />} />
          <Route path="/User-cart" element={<UserCart />} />
          <Route path="/User-order-list" element={<UserOrderList />} />
          <Route path="/user-order-detail/:orderId" element={<UserOrderDetail />} />
          <Route path="/Website-user-profile" element={<WebsiteUserProfile />} />
          <Route path="/User-wish-list" element={<UserWishList />} />
          <Route path="/User-profile" element={<WebsiteUserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
