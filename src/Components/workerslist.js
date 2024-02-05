import { useEffect, useState,useRef, } from 'react';
import EditModal from './editmodal';
import errorsHandler from '../Functions/errorsHandler';
import FetchFailed from './fetchFailed';
import '../Styles/modal.css'
import '../Styles/workerslist.css'

function WorkersList(){

const [informMessage,setInformMessage]=useState("")
const [appState, setAppState] = useState()
const [open,setOpen]=useState(false)
const [update,setUpdate]=useState(new Date())
const wid=useRef()


  useEffect(()=>{
async function get(){
  
  const token2 = sessionStorage.getItem("accessToken")
 const response = await fetch(`http://localhost:5001/listworkers`, {
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
  const allPersons=await response.json()
  var rez=[]

Object.keys(allPersons).map((obj, i) => {rez.push(
  <tr key={allPersons[obj].id}>
      <td>
{allPersons[obj].uniq}
</td>
<td>
{allPersons[obj].name}
</td>
<td>
{allPersons[obj].price}
</td>
<td>
  <span onClick={(e)=>{
    wid.current=allPersons[obj].id
    setOpen(true)
  }}>✏️</span>
  
</td>
</tr>
)})

setAppState(rez)
}
else{
  console.log("No response", response.status)
  errorsHandler(response.status,response.statusText,setInformMessage)
}

  }get()},[update])
  if (informMessage==="494")
          return (<FetchFailed/>)


  return (
    <div className='wlist'>
    <div>
      <table>
        <tbody>
          <th>Идентификатор</th><th>Имя</th><th>ЗП в час</th><th style={{borderTopRightRadius: 15}}>Изменить</th>
        {appState}
        </tbody>
      </table>
      <p>{informMessage}</p>
      </div>

{open &&
<div className={`modal ${open ?`modalactive`:``}`}>
  <EditModal id={wid.current} setUpdate={setUpdate} setOpen={setOpen}/>
  <button className='wlistbutton' onClick={()=>setOpen(false)}>Закрыть</button>
</div>


}
    </div>
  )
}
export default WorkersList;