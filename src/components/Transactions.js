import { useEffect, useState } from 'react';
import Transaction from './Transaction';
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
    const [ transactions, setTransactions ] = useState([]);
    
    useEffect(()=> {
        axios.get(`${API_URL}/data`)
        .then((res)=> {
            setTransactions(res.data);
        }).catch((err) => console.log(err))
    }, []);

    let transactionsArr = transactions.map((transaction, index) => {
        return <Transaction index={index} key={transaction.date+index} transaction={transaction}/>
    })

    return (
      <div className='index'>
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Amount</th>
                    </tr>

                </thead>    
                <tbody>
                        {transactionsArr}
                </tbody>
            </table>
        </section>          
      </div>
    );
}

export default Transactions;