import React from 'react';
import { Link } from "react-router-dom";

function Transaction( { index, transaction} ) {
    let showAmount = Number(transaction.amount).toFixed(2)
    // console.log(showAmount)
  return (
    <tr className='single-transaction'>
        <td>
            {transaction.date}
            <hr className='hr5'/>

        </td>
        <td>
            <Link to={`/transactions/${index}`}> {transaction.name} </Link> 
            <hr className='hr5'/>

        </td>
        <td>
            ${showAmount}
            <hr className='hr5'/>

        </td>
    </tr>
  );
};

export default Transaction;