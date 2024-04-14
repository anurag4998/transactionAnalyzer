import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

import useGroupTransactionsByName from "./utils/useGroupTransactionsByName";

const ViewChart = () => {

    const location = useLocation();
    const transactionList = location.state.transactionList;

    const list = useGroupTransactionsByName(transactionList, transactionList.length,'');
    console.log(list);
    const filteredList = list.filter(transaction => transaction[1].transactionType !== 'RECIEVED' );
    const labels = [];
    const totalAmounts = [];
    const backgroundColor = [];
    const map = new Map();
    const randomColourGenerator = () => {
        return `rgba(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)})`;
    }
    filteredList.forEach(function(transactionObject) {
        console.log(transactionObject)
        let categoryName = transactionObject[1].iconComponent ? transactionObject[1].iconComponent.displayName : null;
        if(!categoryName) {
            categoryName = 'Others';
        }
        if(map.has(categoryName)) {
            map.set(categoryName, map.get(categoryName) + parseFloat(transactionObject[1].totalTransactionAmount));
        }
        else {
            map.set(categoryName, parseFloat(transactionObject[1].totalTransactionAmount));
        }
    })
    map.forEach((value,key) => {
        labels.push(key);
        totalAmounts.push(value);
        backgroundColor.push(randomColourGenerator());
    });
    const data = {
        labels: labels,
        datasets: [
          {
            label: 'Amount Spent',
            data: totalAmounts,
            backgroundColor: backgroundColor,
            borderColor: backgroundColor,
            borderWidth: 1,
          },
        ]
    };
    
    return (
        <div className='w-[30%] h-[30%]'>
            <Doughnut
            data = {data}
            />
        </div>
        
    )
}

export default ViewChart;