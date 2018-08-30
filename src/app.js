import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import AppRouter from './routers/router';

if(!JSON.parse(localStorage.getItem('csvModifierStore'))){
  localStorage.setItem('csvModifierStore',JSON.stringify({}));
} 

ReactDOM.render(<AppRouter />, document.getElementById('app'));