import React,{useState} from 'react'
import { orderData } from '../Service/Service'
import "../CSS/Order.css"
import { useEffect } from 'react'

export default function Order() {

const [apiData,setApiData]=useState([])
const [copyapiData,setcopyApiData]=useState([])
const [entryData,setEntryData]=useState({})
const [text,setText]=useState("")

const getData=()=>{
    setApiData(orderData)
    setcopyApiData(orderData)
}

useEffect(()=>{
const filtered=copyapiData.filter((item)=>item.poNumber.includes(text))
setApiData(filtered )
},[text])

const handleAdd=()=>{
    setApiData([...apiData,entryData])
    setcopyApiData([...copyapiData,entryData])
}

  return (
    <div>
        {/* <div className='container'>
            <div className='inventry_Div' onClick={getData} >
            <h2 className='PO_heading'>Inventry</h2>
            </div>
            <div className='order_Div'  >
            <h2 className='PO_heading'> PO Entry</h2>
            </div>
        </div> */}
        <div className='entry_Div'>
            <h1>Enter Purchase Order Details</h1>
            <input type="text" className='enter_Text' id='po_Text' placeholder='Enter PO Number' onChange={(e)=>setEntryData({...entryData,poNumber:e.target.value})}/>
            <input type="text" className='enter_Text' placeholder='Enter Item Code' onChange={(e)=>setEntryData({itemCode:e.target.value})}/>
            <input type="text" className='enter_Text'placeholder='Enter UPC Code' onChange={(e)=>setEntryData({...entryData,upcCode:e.target.value})}/>
            <input type="text" className='enter_Text'placeholder='Enter Quantity' onChange={(e)=>setEntryData({...entryData,poQuantity:e.target.value})}/>
            <button onClick={handleAdd}>Submit</button>
        </div>
        <button onClick={getData}>Get PO Details</button>
        <div className='products_Div'>
            <input type="text" className='search_Text' placeholder='Search PO Number' onChange={(e)=>setText(e.target.value)} />
        {console.log("--->",apiData)}
        <table>
            <tr>
                <th>Item Cod</th>
                <th>PO Number</th>
                <th>UPC Code</th>
                <th>Quantity</th>
            </tr>
        {apiData.map((item)=>
            <tr>
            <td>{item.itemCode}</td>
            <td>{item.poNumber}</td>
            <td>{item.upcCode}</td>
            <td>{item.poQuantity}</td>
            </tr>
        )}
        </table>
        {/* {apiData.map((item)=>
        <div className='item_Div'>
            <h4>Item Cod:-{item.itemCode}</h4>
            <h4>PO Number:-{item.poNumber}</h4>
            <h4>UPC Code:-{item.upcCode}</h4>
            <h4>Quantity:-{item.poQuantity}</h4>
        </div>)} */}
        </div>
        
    </div>
  )
}
