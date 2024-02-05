import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './Components/errorboundary';

import './index.css';


     
  
const root = ReactDOM.createRoot(document.getElementById('root'))
function About(){ root.render( <h2>О сайте</h2>) }
root.render(
  <div>
 
<ErrorBoundary>
  <App/>
</ErrorBoundary> 
    
    </div>




);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
