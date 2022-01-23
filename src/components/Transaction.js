import React from 'react';
import { Link } from "react-router-dom";


function Transaction( { index, transaction} ) {
    let showAmount = Number(transaction.amount).toFixed(2)
    console.log(showAmount)
  return (
    <tr>
        <td>
            {transaction.date}
        </td>
        <td>
            <Link to={`/transactions/${index}`}> {transaction.name} </Link> 
        </td>
        <td>
            ${showAmount}
        </td>
    </tr>
  );
};

export default Transaction;