import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import axios from "axios";


ChartJS.register(ArcElement, Tooltip, Legend);

const API_URL = process.env.REACT_APP_API_URL;
  
function PieChart() {
    const [ data, setData ] = useState({
        labels: ['Income', 'Expenses', 'Bills*', 'Shopping*'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      useEffect(() => {
        axios.get(`${API_URL}/transactions`)
        .then((res)=> {
            let responseAPI = res.data;
            let income = responseAPI.map((el)=> Number(el.amount) > 0 ? Number(el.amount) : 0).reduce((acc, curr) => acc + curr);
            let expenses = responseAPI.map((el)=> Number(el.amount) < 0 ? Number(el.amount) : 0).reduce((acc, curr) => acc + curr);

            let shopping = responseAPI.map((el) => el.name === "Shopping" ? Number(el.amount) : 0).reduce((acc, curr) => acc + curr);

            let bills = responseAPI.map((el)=> {
                if (el.name === "Gas" || el.name === "Rent" || el.name === "Phone" || el.name === "Bills") {
                    return Number(el.amount)
                } else {
                    return 0
                }
            }).reduce((acc, curr) => acc + curr);
            
            console.log("BILLLL", bills)
            setData({
                labels: ['Income', 'Expenses', 'Bills*', 'Shopping*'],
                datasets: [
                  {
                    label: '# of Votes',
                    data: [income, expenses, bills, shopping],
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                  },
                ],
              })
            
        }).catch((err)=> console.log(err))
      }, [])

  return <Pie data={data}/>
}

export default PieChart;
