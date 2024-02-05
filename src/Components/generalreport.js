import React, { useRef,useEffect,useState,useMemo } from 'react'
import { useTable,useGlobalFilter } from 'react-table'
import errorsHandler from '../Functions/errorsHandler';
import FetchFailed from './fetchFailed';
import '../Styles/generalreport.css'

function formatDate(date){
   date=new Date(date)
   
   return date.toLocaleString("ru-RU", { year: "2-digit" } + { month: "2-digit" })
   
}

export default function Generalreport() {
    const [informMessage,setInformMessage]=useState("")
    const report=useRef({})
    const [rep,setRep]=useState([{}])

    const columns2=[
        {
          Header: 'Ид',
          accessor: 'uniq',
        },
        {
          Header: 'Имя',
          accessor: 'name',
        },
        {
          Header: 'Начал',
          accessor: row => formatDate(row.tBegin),
        },
        {
            Header: 'Закончил',
            accessor: row => formatDate(row.tEnd),
          },
          {
            Header: 'Работал',
            accessor: 'timeOfWork',
          },
          {
            Header: 'Проект',
            accessor: 'project',
          },
          {
            Header: 'ЗП в час',
            accessor: 'price',
          },
          {
            Header: 'Заработал',
            accessor: 'salary',
          },]

    useEffect(()=>{
        async function get(){
        const token2 = sessionStorage.getItem("accessToken")
         const response = await fetch(`http://localhost:5001/list`, {
          method: "GET",
          headers: { "custom-header": "application/json", "Authorization": "Bearer " + token2 }
        
        })
        .catch(e=> {
          errorsHandler(494,"Не удалось подключиться к серверу",setInformMessage)
          return 0
        })
       if (!response)
       return
        
        
        console.log("in get")
        if (response.ok === true) {
          const allPersons=await response.json()
          report.current=allPersons
          setRep(allPersons)       
        }
        else{
          console.log("No response", response.status)
          errorsHandler(response.status,response.statusText,setInformMessage)
        }

          }get()},[])
          
          const columns = useMemo(() => columns2, [])
          const data = useMemo(() => rep, [rep])
          const table=useTable({columns,data}, useGlobalFilter)
          const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, preGlobalFilteredRows, setGlobalFilter, state} = table
          const { globalFilter } = state;

          return (
            <div className='gener'>
            {informMessage==="494"?<FetchFailed/>:""}
            <div>
                <input
                    type="text"
                    placeholder='Фильтр'
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
                </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>{informMessage}</p>
            </div>
          )
}



