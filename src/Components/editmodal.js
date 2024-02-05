import React, { useEffect, useState } from 'react';
import errorsHandler from '../Functions/errorsHandler';
import '../Styles/editmodal.css'

async function getworker(data,setOpen,setUpdate){
    const token2 = sessionStorage.getItem("accessToken")
    const response = await fetch(`http://localhost:5001/update`, {
        method: "PUT",
        headers: { "custom-header": "application/json", "Content-Type": "application/json", "Authorization": "Bearer " + token2 },
        body: JSON.stringify(data)
   
    });
    if (response.ok === true) {
           
        console.log("OK")
        setOpen(false)
        setUpdate(new Date())
    }
    else
        console.log("Ошипка")
}

function EditModal(props){
    console.log("IN EditModal")
    const token2 = sessionStorage.getItem("accessToken")
    const [informMessage,setInformMessage]=useState("")
    const [w2,setW2]=useState({})

    useEffect(()=>{
async function get(){
   const response = await fetch(`http://localhost:5001/get/${props.id}`, {
    method: "GET",
    headers: { "custom-header": "application/json", "Authorization": "Bearer " + token2 }

})
.catch(e=> {
    errorsHandler(494,"Не удалось подключиться к серверу",setInformMessage)
    return 0
  })
 if (!response)
 return


if (response.ok === true) {
   const report=await response.json()

setW2(report)

}
else{
    console.log("No response", response.status)
    errorsHandler(response.status,response.statusText,setInformMessage)
}
    }get()},[])

    return(
        <div className='editmodal'>
      
<table  style={{borderRadius: 5}}>
<tbody>
<tr>
    <td>
        
        <label>Уникальный номер</label><br />
        <input type="number" id="uniq" disabled="true" onChange={e=>setW2({...w2,uniq:e.target.value})} value={w2.uniq}/>
    </td>
</tr>
<tr>
    <td>
        <label>Имя</label><br />
        <input type="text" id="name" onChange={e=>setW2({...w2,name:e.target.value})} value={w2.name}/>
    </td>
</tr>
<tr>
    <td>
        <label>Зарплата в час</label><br />
        <input type="number" id="price" onChange={e=>setW2({...w2,price:e.target.value})} value={w2.price}/>
    </td>
</tr>
<tr >
    <td >
        
            <button onClick={(e)=>{
                e.preventDefault()
                getworker(w2,props.setOpen,props.setUpdate)}}><span>Изменить</span></button>
        
    </td>
</tr>
</tbody>
</table>
<p>{informMessage}</p>

    </div>
    )
}
export default EditModal