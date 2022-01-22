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
    <article className="transaction-details">
        <h1> Transaction Details </h1>

        <div className="info-container">
          <div className="date">Date: {transactions.date}</div>
          <div className="name">Expenditure: {transactions.name}</div>
          <div className="amount">${transactions.amount}</div>
          <div className="from">By: {transactions.from}</div>
        </div>
        <div className="buttons">
          <Link to={`/`}> <button>Back</button> </Link>
          <Link to={`/transactions/${index}/edit`}> <button>Edit</button> </Link>
          <button onClick={handleDelete}> Delete</button>
        </div>
    </article>
  );
}

export default TransactionDetails;