import { useState, useEffect } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const [ transactions, setTransactions ] = useState([]);
  const { index } = useParams();
  let navigate = useNavigate();
  useEffect(() => {
    axios.get(`${API_URL}/transactions/${index}`)
    .then((res)=> {
      setTransactions(res.data)
    }).catch((err) => {
      navigate("/not-found");
      console.log(err)
    });
  }, [index]);

  const handleDelete = () => {
    axios.delete(`${API_URL}/transactions/${index}`)
      .then((res)=> {
        window.alert(`Transaction from ${transactions.from}  $${transactions.amount} has been deleted`);
        navigate("/");
      }).catch((err)=> console.log(err));
  };

  return (
    <article className="details-container">
        <h1> View Transaction Details </h1>
        <hr className='hrFancy'/>
        <br/>
        <div className="details-info-container">
          <h4 className="date">Date: {transactions.date}</h4>
          <h4 className="name">Expenditure: {transactions.name}</h4>
          <h4 className="amount">Amount: ${transactions.amount}</h4>
          <h4 className="from">By: {transactions.from}</h4>
        </div>
        <div className="buttons">
          <Link to={`/`}> <button className="details-buttons">Back</button> </Link>
          <Link to={`/transactions/${index}/edit`}> <button className="details-buttons">Edit</button> </Link>
          <button className="details-buttons" onClick={handleDelete}> Delete</button>
        </div>
    </article>
  );
}

export default TransactionDetails;