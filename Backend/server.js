require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const createuserRoutes = require('../Backend/routes/createuser');
const userloginRoutes = require('./routes/userlogin')
const webregisterRoutes = require('./routes/webregister');
const webloginRoutes = require('./routes/weblogin');
const addnewproductRoutes = require('./routes/addnewproduct');
const addtocartRoutes = require('./routes/addtocart');
const addtowishlistRoutes = require('./routes/addtowishlist');
const paymentRoutes = require('./routes/payment');
const orderRouter = require('./routes/order');
const productfilterRoutes = require('../Backend/routes/productfilter');
const productdetailsRoutes = require('./routes/productdetails')
const orderdetailsRoutes = require('./routes/orderdetails')

// express app
const app = express();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/website', createuserRoutes);
app.use('/api/website', userloginRoutes);
app.use('/api/website', webregisterRoutes);
app.use('/api/website', webloginRoutes);
app.use('/api/website', addnewproductRoutes);
app.use('/api/website', addtocartRoutes);
app.use('/api/website', addtowishlistRoutes);
app.use('/api/website', paymentRoutes);
app.use('/api/website', orderRouter);
app.use('/api/website', productfilterRoutes);
app.use('/api/website', productdetailsRoutes)
app.use('/api/website', orderdetailsRoutes)





// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
        });
    })
    .catch((error) => {
        console.log(error);
    });



