import React from 'react';
import { Link } from "react-router-dom";

function Transaction( props ) {
    const { index } = props.index;
    const { date, name, amount } = props.transaction;
  return (
    <tr>
        <td>
            {date}
        </td>
        <td>
            <Link to={`/transactions/${index}`}> {name} </Link>
        </td>
        <td>
            {amount}
        </td>
    </tr>
  );
};

export default Transaction;