import React, { useState } from 'react'
import errorsHandler from '../Functions/errorsHandler';
import '../Styles/login.css'

async function sendLogin(data,setAutorize,setInformMessage){
    console.log("loging")
    
    
    var tokenKey = "accessToken";
    const response = await fetch(`http://localhost:5001/login`, {
        method: "POST",
        headers: { "custom-header": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data)
   
    });
    if (response.ok === true) {
           
        console.log("OK")
        const access_token = await response.json();
        sessionStorage.setItem(tokenKey, access_token);
        setAutorize(true)
          
    }
    else{
        console.log("Ошипка")
        errorsHandler(response.status,response.statusText,setInformMessage)
    }
}

export default function Login({setAutorize}) {
    const [login,setLogin]=useState()
    const [informMessage,setInformMessage]=useState("")

  return (
    <div className='center-screen'>

    <input type="password" placeholder="Введите пароль" onChange={(e)=>setLogin(e.target.value)} /><br />
    <button className='btn' onClick={(e)=>{
        e.preventDefault()
        sendLogin(login,setAutorize,setInformMessage)
    }}><span>Ввести</span></button>
    <p>{informMessage}</p>
    
</div>
  )
}
