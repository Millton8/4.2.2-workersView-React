import React, { useState,useEffect } from 'react'
import '../Styles/status.css'
import errorsHandler from '../Functions/errorsHandler';
import FetchFailed from './fetchFailed';

export default function Status() {
    const [report,setReport]=useState([{}])
    const [informMessage,setInformMessage]=useState("")
    
    
    useEffect(()=>{
        async function get(){
          const token2 = sessionStorage.getItem("accessToken")
         const response = await fetch(`http://localhost:5001/status`, {
          method: "GET",
          headers: { "custom-header": "application/json", "Authorization": "Bearer " + token2 }
        })
        .catch(e=> {
          errorsHandler(494,"Не удалось подключиться к серверу",setInformMessage)
        })
       if (!response)
       return

        if (response.ok === true) {
          const allPersons=await response.json()
       
          setReport(allPersons)
                
        }
        else{
          console.log("No response", response.status)
          errorsHandler(response.status,response.statusText,setInformMessage)
          
        }
        
          }get()},[])
          
          if (informMessage==="494")
          return (<FetchFailed/>)


  return (
    
    <div>
<h1>Сотрудники на объектах</h1>
{report.map(({uniq,name,project,workerstatus})=>

  
<div className={`stp ${workerstatus===true? `on`:`off`}`}>

    <p title={`${uniq}`}>{name} {project} </p>

</div>



)}
<p>{informMessage}</p>
         </div>


  )
}
