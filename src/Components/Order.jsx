import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { orderData } from "../Service";
import { baseUrl } from "../config";

export default function Order() {
  const [apiData, setApiData] = useState([]);
  const [apiDataPO, setApiDataPO] = useState([]);
  const [postData, setPostData] = useState([]);
  const [poNum, setPoNum] = useState();
  const [apipo, setApipo] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resData, setResData] = useState("");
  const getData = async (poNumFetch) => {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      po: poNumFetch,
    };

    const bodyParameters = {
      po: poNumFetch,
    };
    const config = {
      headers: { contentType: "application/json" },
    };
    const result = await axios.post(`${baseUrl}/pos`, bodyParameters);
    const newItemList = result.data[0].itemlist.map((item) => ({
      ...item,
      recquantity: 0,
    }));
    setApiData(newItemList);
    setApipo(result.data[0].po);
    setPostData(result.data);
  };
  const handleSubmit = async () => {
    const url = `${baseUrl}/posupdate`;
    const objPostData = postData[0];
    const newApiData = apiData.map((item) => ({
      ...item,
      quantity: item.recquantity,
    }));
    const poPostData = { ...objPostData, itemlist: [...newApiData] };
    const result = await axios.post(url, poPostData);
    if (result.status === 200) {
      setResData(result.data);
      setIsSuccess(true);
    }
  };
  const handleFetchPO = (val) => {
    getData(val);
    setIsSuccess(false);
  };
  useEffect(() => {
    const filtered = orderData.filter((item) => item.poNumber === poNum);
    setApiDataPO(filtered);
  }, [poNum]);

  const handleAdd = (currPoNum) => {
    setPoNum(currPoNum);
    const existData = apiData.filter((item) => item.upccode === currPoNum);
    if (existData.length > 0) {
      apiData.forEach((item) => {
        if (item.upccode === existData[0].upccode)
          item.recquantity = Number(item.recquantity) + 1;
      });
      setApiData([...apiData]);
      setPoNum("");
    } else {
      setApiData([...apiDataPO, ...apiData]);
    }
  };

  return (
    <div>
      <div className="entry_Div">
        <h1>Enter Purchase Order Details</h1>

        <input
          type="number"
          className="enter_Text"
          id="po_fetch_Text"
          placeholder="Enter PO Number"
          onBlur={(e) => handleFetchPO(e.target.value)}
        />
        <input
          type="text"
          value={poNum}
          className="enter_Text"
          id="po_Text"
          placeholder="Enter UPC Number"
          onChange={(e) => handleAdd(e.target.value)}
        />

        {/* <input
          type="text"
          className="enter_Text"
          placeholder="Item Code"
          value={apiDataPO.length > 0 ? apiDataPO[0]["itemCode"] : ""}
          onChange={(e) => setEntryData({ itemCode: e.target.value })}
        />
        <input
          type="text"
          className="enter_Text"
          placeholder="UPC Code"
          value={apiDataPO.length > 0 ? apiDataPO[0]["upcCode"] : ""}
          onChange={(e) =>
            setEntryData({ ...entryData, upcCode: e.target.value })
          }
        />
        <input
          type="text"
          className="enter_Text"
          placeholder="Quantity"
          value={apiDataPO.length > 0 ? apiDataPO[0]["poQuantity"] : ""}
          onChange={(e) =>
            setEntryData({ ...entryData, poQuantity: e.target.value })
          }
        />
        <button onClick={handleAdd}>Submit</button> */}
      </div>
      <div className="products_Div">
        <table>
          <tr>
            <th>Item Cod</th>
            <th>PO Number</th>
            <th>UPC Code</th>
            <th>Quantity</th>
            <th> Recieved Qty</th>
          </tr>
          {apiData.map((item) => (
            <tr>
              <td>{item.item}</td>
              <td>{apipo}</td>
              <td>{item.upccode}</td>
              <td>{item.quantity}</td>
              <td>{item.recquantity}</td>
            </tr>
          ))}
        </table>
        <button onClick={handleSubmit}>Submit</button>
        {isSuccess && <h4>Sucessfully Submitted the PO!!</h4>}
        {isSuccess && (
          <h4>
            <i>Response Status:</i> {resData[0].status}
          </h4>
        )}
        {isSuccess && (
          <h3>
            <i>Response Reason:</i> {JSON.stringify(resData[0].reason)}
          </h3>
        )}
      </div>
    </div>
  );
}
