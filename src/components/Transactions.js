//dependencies
import { useEffect, useState } from 'react';
import axios from "axios";

//components
import Transaction from './Transaction';
import PieChart from './chart/PieChart';

//material UI
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';

//Chart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: "x",
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: "right",
        },
        title: {
            display: true,
            text: "~Pilot Chart.js: Expenditure and Bills Over Time per Transaction"
        },
    },
};

let labels = [ "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th"];

const API_URL = process.env.REACT_APP_API_URL;

function Transactions() {
    const [ transactions, setTransactions ] = useState([]);
    const [chartData, setChartData ] = useState({
        labels: [],
        datasets: [
            {
                label: "Gas",
                data:[],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            }, {
                label: "Bills",
                data:[],
                borderColor: "rgb(53, 162, 245)",
                backgroundColor: "rgba(53, 162, 245, 0.5)",
            },
        ],
    });

    useEffect(()=> {
        axios.get(`${API_URL}/transactions`)
        .then((res)=> {
            setTransactions(res.data);
            const dataSet1 = []; 
            const dataSet2 = []; 
            let apiData = res.data;
            console.log(apiData);
            for ( let singleTransaction of apiData){
                if(singleTransaction.amount > 0){
                    console.log(singleTransaction);
                    dataSet1.push(Number(singleTransaction.amount));
                } else if (singleTransaction.amount < 0) {
                    dataSet2.push(Number(singleTransaction.amount));
                }
            }
            setChartData({
                labels,
                datasets: [
                    {
                        label: "Income",
                        data: dataSet1,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                    }, {
                        label: "Bills",
                        data: dataSet2,
                        borderColor: "rgb(53, 162, 245)",
                        backgroundColor: "rgba(53, 162, 245, 0.5)",
                    },
                ],
            })
            console.log("~~~ARRAYDATA", dataSet1, dataSet2)
        }).catch((err) => console.log(err));
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

    let copyArray = transactions.map((el) => el);

    let expenses = copyArray.reduce((acc, currObj) => {
        if(currObj.amount < 0){
            return acc + Number(currObj.amount) 
        } else {
            return acc + 0
        }
    },  0);
    
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
        <section className='charts-container'>
            <div style={{width:'80%', height:'50%'}}>
                <div>Bar-Graph</div>
                <div className='bar-graph'>
                    <Bar data={chartData} options={options}/>
                    <h6> Figure 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. amcorper, congue tel. </h6>
                </div>
                <div>
                </div>
                <hr/>
                <br/>
           
                <div className='pie-chart' style={{width:'40%', height:'30%'}}>
                    <h3> Account Summary </h3>
                    <PieChart/>
                    <h6> Figure 2: Lorem ipsum dolor sit amet.</h6>
                </div>
           
            </div>
        </section>
      </div>
    );
}

export default Transactions;