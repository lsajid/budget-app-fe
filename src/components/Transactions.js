import { useEffect, useState } from 'react';
import Transaction from './Transaction';
import axios from "axios";
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
// import {Chart} from "./Chart"

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
    const [ transactions, setTransactions ] = useState([]);
    const [chartData, setChartData ] = useState({});
    useEffect(()=> {
        axios.get(`${API_URL}/transactions`)
        .then((res)=> {
            setTransactions(res.data);
            // setChartData({
            //     labels: res.data.map((transaction) => transaction.name),
            //     datasets: [
            //         {
            //             label:"Price in USD",
            //             data: res.data.map((el)=> el.amount),
            //             backgroundColor: [
            //                 "#ffbb11",
            //                 "#ecf0f1",
            //                 "#50AF95",
            //                 "#f3ba2f",
            //                 "#2a71d0"
            //               ]
            //         }
            //     ]
            // })
        }).catch((err) => console.log(err))
    }, []);

    let transactionsArr = transactions.map((transaction, index) => {
        return <Transaction index={index} key={transaction.date+index} transaction={transaction}/>
    })

    let accountTotal = transactions.map((el) => el.amount).reduce((acc, curr) => {
        return Number(acc) + Number(curr);
    }, 0);

    let income = transactions.map((el)=> Number(el.amount) > 0 ? Number(el.amount) : 0).reduce((acc, curr) => {
        return Number(acc) + Number(curr);
    }, 0);

    let copyArray = transactions.map((el) => el)

    let expenses = copyArray.reduce((acc, currObj) => {
        if(currObj.amount < 0){
            return acc + Number(currObj.amount) 
        } else {
            return acc + 0
        }
    },  0)
    
    let colors = () => {
        if(accountTotal >= 1000){
            return <div style={{backgroundColor: "#119462", color: "white", borderRadius: "10px", padding: "10px"}} className='display-account'> Account Balance: ${accountTotal.toFixed(2)} <EmojiEmotionsIcon/></div>
        } else if ( accountTotal < 0 ) {
            return <div style={{backgroundColor: "#CF1020", color: "white", borderRadius: "10px", padding: "10px"}} className='display-account'> Account Balance: ${accountTotal.toFixed(2)} <MoodBadIcon/> </div>
        } else {
            return <div style={{backgroundColor: "#859EA7", color: "white", borderRadius: "10px", padding: "10px"}} className='display-account'> Account Balance: ${accountTotal.toFixed(2)} <SentimentSatisfiedIcon/></div>
        }
    }

    return (
      <div className='account-container'>
        <div className='account-summary'>
            <div> Income: ${income}</div>
            <div> Expense: ${expenses}</div> 
            {colors()}
        </div>

        <section className='account-table-container'>
            <table className='account-table'>
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