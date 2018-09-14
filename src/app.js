import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/router';

if(localStorage.getItem('csvModifierStore')==null){
  localStorage.setItem('csvModifierStore',JSON.stringify({}));
}
const set1 = JSON.parse(localStorage.getItem('csvModifierStore')); 

ReactDOM.render(<AppRouter match={set1} />, document.getElementById('app'));