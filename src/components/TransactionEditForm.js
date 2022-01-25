import React from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';


const API_URL = process.env.REACT_APP_API_URL;

function TransactionEditForm() {
  let navigate = useNavigate();
  const { index } = useParams();

  const [ transaction, setTransaction ] = useState({
    date: "",
    name: "",
    amount: 0,
    from: ""
  });
  
  useEffect(() => {
    axios.get(`${API_URL}/transactions/${index}`)
      .then((res) => {
        setTransaction(res.data);
        console.log(transaction);
      }).catch((err) => console.log(err));
  }, [index]);

  const handleTextChange = (e) => {
    setTransaction({...transaction, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    console.log(transaction)
    e.preventDefault();
    axios.put(`${API_URL}/transactions/${index}`, transaction)
    .then((res)=> {
      navigate(`/transactions/${index}`);
    }).catch((err) => console.log(err))
  };

  return (
    <div className="edit-container">
        <h2>Edit Transaction Form</h2>
        <hr className='hrFancy'/>
        <br/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date"> Date: </label>
          <input
            id="date"
            value={transaction.date}
            type="text"
            placeholder="ex: November 16"
            onChange={handleTextChange}
          />
          <label htmlFor="name"> Name: </label>
          <input
            id="name"
            value={transaction.name}
            type="text"
            placeholder="ex: Rent"
            onChange={handleTextChange}
          />
          <label htmlFor="amount"> Amount: </label>
          <input
            id="amount"
            value={transaction.amount}
            type="number"
            placeholder="ex: $2300"
            onChange={handleTextChange}
          />
          <label htmlFor="from"> From: </label>
          <input
            id="from"
            value={transaction.from}
            type="text"
            placeholder="ie: CVS"
            onChange={handleTextChange}
          />
          <br />
          <br />
          <input className="edit-buttons" type="submit"/>
        </form>

          <Link to={"/"}> <button className='edit-buttons'> Cancel </button></Link>
    </div>
  );
}

export default TransactionEditForm;