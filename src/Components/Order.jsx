import React, { useState, useEffect } from "react";
import { orderData } from "../Service";
import "./Order.css";

export default function Order() {
  const [apiData, setApiData] = useState([]);
  const [apiDataPO, setApiDataPO] = useState([]);
  const [entryData, setEntryData] = useState([]);
  const [poNum, setPoNum] = useState(0);
  const [existPO, setExistPo] = useState({});

  useEffect(() => {
    const filtered = orderData.filter((item) => item.poNumber === poNum);
    setApiDataPO(filtered);
  }, [poNum]);

  const handleAdd = () => {
    const existData = apiData.filter((item) => item.poNumber === poNum);
    // setExistPo(existData);
    if (existData.length > 0) {
      apiData.forEach((item) => {
        if (item.poNumber === existData[0].poNumber)
          item.poQuantity = item.poQuantity + 1;
      });
      setApiData([...apiData]);
    } else {
      setApiData([...apiDataPO, ...apiData]);
    }
  };

  return (
    <div>
      <div className="entry_Div">
        <h1>Enter Purchase Order Details</h1>

        <input
          type="text"
          className="enter_Text"
          id="po_Text"
          placeholder="Enter PO Number"
          onChange={(e) => setPoNum(e.target.value)}
        />
        <input
          type="text"
          className="enter_Text"
          placeholder="Enter Item Code"
          value={apiDataPO.length > 0 && apiDataPO[0]["itemCode"]}
          onChange={(e) => setEntryData({ itemCode: e.target.value })}
        />
        <input
          type="text"
          className="enter_Text"
          placeholder="Enter UPC Code"
          value={apiDataPO.length > 0 && apiDataPO[0]["upcCode"]}
          onChange={(e) =>
            setEntryData({ ...entryData, upcCode: e.target.value })
          }
        />
        <input
          type="text"
          className="enter_Text"
          placeholder="Enter Quantity"
          value={apiDataPO.length > 0 && apiDataPO[0]["poQuantity"]}
          onChange={(e) =>
            setEntryData({ ...entryData, poQuantity: e.target.value })
          }
        />
        <button onClick={handleAdd}>Submit</button>
      </div>
      <div className="products_Div">
        <table>
          <tr>
            <th>Item Cod</th>
            <th>PO Number</th>
            <th>UPC Code</th>
            <th>Quantity</th>
          </tr>
          {apiData.map((item) => (
            <tr>
              <td>{item.itemCode}</td>
              <td>{item.poNumber}</td>
              <td>{item.upcCode}</td>
              <td>{item.poQuantity}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
