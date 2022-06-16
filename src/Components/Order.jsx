import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Order.css";
import { orderData } from "../Service";
import { baseUrl } from "../config";

export default function Order() {
  const [apiData, setApiData] = useState([]);
  const [apiDataPO, setApiDataPO] = useState([]);
  const [postData, setPostData] = useState([]);
  const [entryData, setEntryData] = useState([]);
  const [poNum, setPoNum] = useState(0);
  const [apipo, setApipo] = useState(0);
  const [existPO, setExistPo] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);

  const getData = async () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      po: "12",
    };

    const bodyParameters = {
      po: "12",
    };
    const config = {
      headers: { contentType: "application/json" },
    };
    const result = await axios.post(`${baseUrl}/pos`, bodyParameters);
    const newItemList = result.data[0].itemlist.map((item) => ({
      ...item,
      quantity: 0,
    }));
    setApiData(newItemList);
    setApipo(result.data[0].po);
    setPostData(result.data);
  };
  const handleSubmit = async () => {
    const url = `${baseUrl}/posupdate`;
    const objPostData = postData[0];
    const poPostData = { ...objPostData, itemlist: [...apiData] };
    const result = await axios.post(url, poPostData);
    if (result.status === 200) {
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    const filtered = orderData.filter((item) => item.poNumber === poNum);
    setApiDataPO(filtered);
  }, [poNum]);

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = (currPoNum) => {
    setPoNum(currPoNum);
    const existData = apiData.filter((item) => item.upccode === currPoNum);
    // setExistPo(existData);
    if (existData.length > 0) {
      apiData.forEach((item) => {
        if (item.upccode === existData[0].upccode)
          item.quantity = Number(item.quantity) + 1;
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
          type="text"
          className="enter_Text"
          value={poNum}
          id="po_Text"
          placeholder="Enter PO Number"
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
          </tr>
          {apiData.map((item) => (
            <tr>
              <td>{item.item}</td>
              <td>{apipo}</td>
              <td>{item.upccode}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </table>
        <button onClick={handleSubmit}>Submit</button>
        {isSuccess && <h4>Sucessfully Submitted the PO!!</h4>}
      </div>
    </div>
  );
}
