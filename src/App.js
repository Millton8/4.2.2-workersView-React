import React from 'react';
import { useState } from 'react';
import { Route,Routes } from 'react-router';
import { BrowserRouter,Link } from 'react-router-dom';
import WorkersList from './Components/workerslist';
import Generalreport from './Components/generalreport';
import Status from './Components/status';
import Login from './Components/login';
import Nav from './Components/navigation';
import NotFound from './Components/notfound';
import { Layout, } from "antd";
import './Styles/status.css'
import './antd.css'



function App() {
const { Content, Header, Sider, Footer } = Layout;
 const[autorize,setAutorize]=useState(false)
 const token2 = sessionStorage.getItem("accessToken")
 
    return (


<BrowserRouter>
<div className='main'>

        {token2&&<Nav />}
        <Routes>
         {autorize===false?<Route path="/" element={<Login setAutorize={setAutorize}/>}/>:<Route path="/"  element={<Status />} />}
          <Route path="/status"  element={<Status />} />
          <Route path="/general" element={<Generalreport />} />
          <Route path="/workerslist" element={<WorkersList/>} />
          <Route path="*" element={<NotFound />} />
         </Routes>
         
</div>
</BrowserRouter>

  
  )
}

export default App;
