import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function TransactionNewForm() {
  let navigate = useNavigate();
  const { index } = useParams();
  
  const [ transaction, setTransaction ] = useState({
    date: "",
    name: "",
    amount: 0,
    from: ""
  });

  const handleTextChange = (e) => {
    setTransaction({...transaction, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/transactions`, transaction)
    .then((res)=> {
      navigate("/");
    }).catch((err) => console.log(err))
  };

  return (
    <div className="new-container">
        <h2>Add Transaction Form</h2>
        <hr className='hrFancy'/>
        <br/>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date"> Date: </label>
          <input
            id="date"
            value={transaction.date}
            type="date"
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
          <br/>
          <input className="new-buttons" type="submit"/>
        </form>
        <Link to={"/"}> <button className="new-buttons"> Cancel </button></Link>
    </div>
  );
}

export default TransactionNewForm;