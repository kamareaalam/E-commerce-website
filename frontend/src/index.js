import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App';
import CartContextProvider from './Context/CartContextProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartContextProvider>
      <App />
    </CartContextProvider>
);
