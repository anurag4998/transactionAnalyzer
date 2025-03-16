import React, {useEffect, useRef, useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut,getDatasetAtEvent, getElementAtEvent, getElementsAtEvent} from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
import useGroupTransactions from './utils/useGroupTransactions';

ChartJS.register(ArcElement, Tooltip, Legend);


const randomColourGenerator = () => {
  return `rgba(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)})`;
}

const rand = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom"
    },
  },
};

const printDatasetAtEvent = (dataset,parentData) => {
  if (!dataset.length) return;
  const datasetIndex = dataset[0].datasetIndex;
  console.log(parentData.datasets[datasetIndex].label);
};

const printElementAtEvent = (element,parentData) => {
  if (!element.length) return;

  const { datasetIndex, index } = element[0];

  return parentData.labels[index];
};

const printElementsAtEvent = (elements) => {

  if (!elements.length) return;
  console.log(elements.length);

};
const getFilteredList = function(list ) {
  if(!list) {
    return;
  }
  //return Promise.resolve(list.filter(transaction => transaction[1].transactionType !== 'RECIEVED' ));
  return list.filter(transaction => transaction[1].transactionType !== 'RECIEVED' );
}
const populateMapForParentCategories = (list) => {
  if(!list) {
    return;
  }
  console.log(list);
  const map = new Map();
  
  list.forEach(function(transactionObject) {
      console.log(transactionObject)
      let categoryName = transactionObject[1].iconComponent ? transactionObject[1].iconComponent.category : null;
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
  
  return map;
}

const populateMapForParentCategoriesV2 = (list) => {
  if(!list) {
    return;
  }
  console.log(list);
  const map = new Map();
  
  list.forEach(function(transactionObject) {
      const categoryName = transactionObject[0];
      const transactionsArray = transactionObject[1];
      if(!categoryName) {
        categoryName = 'Others';
      }
      const amount = transactionsArray.reduce((acc, transaction) =>  acc + transaction.totalTransactionAmount, 0);
      map.set(categoryName, amount);
  });

  return map;
}

const getChartDataFromMap = (map) => {
    const labels = [];
    const totalAmounts = [];
    const backgroundColor = [];
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
  return data;
}

const getChildData = (list,category) => {
  const labels = [];
  const amount = [];
  const backgroundColor = [];
  console.log(list)
  list.forEach(function (transactionObject) {
    if(transactionObject[1].iconComponent && transactionObject[1].iconComponent.category === category) {
      amount.push(transactionObject[1].totalTransactionAmount);
      labels.push(transactionObject[1].recipientName);
      backgroundColor.push(randomColourGenerator());

    }
  })
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount Spent',
        data: amount,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ]
  };
  return data;
}

const getChildDataV2 = (list,category) => {
  const labels = [];
  const amount = [];
  const backgroundColor = [];

  const map = new Map();

  const transactionObject = list.filter(transaction => transaction[0] === category);
  const transactionsArray = transactionObject[0][1];
  transactionsArray.forEach(function(transaction) {
    if(map.has(transaction.recipientName)) {
      map.set(transaction.recipientName, map.get(transaction.recipientName) + parseFloat(transaction.totalTransactionAmount));
    }
    else {
      map.set(transaction.recipientName, transaction.totalTransactionAmount);
    }
  });
  map.forEach((value,key) => {
    labels.push(key);
    amount.push(value);
    backgroundColor.push(randomColourGenerator());
  });
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Amount Spent',
        data: amount,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ]
  };
  
  return data;
}
const ViewChart = () => {
    const [showSubCategoryData, setShowSubCategoryData] = useState(false);
    let [parentData, setParentData] = useState({});
    let [childData, setChildData] = useState({})
    const chartRef = useRef(null);
    const location = useLocation();
    const transactionList = location.state.transactionList
    const groupedList = useGroupTransactions(transactionList);

    const handleCategoryClick = (event) => {
      console.log(event)
      const { current: chart } = chartRef;
      console.log(chart);
      if (!chart) {
        return;
      }

      printDatasetAtEvent(getDatasetAtEvent(chart, event),parentData);
      const categoryClicked = printElementAtEvent(getElementAtEvent(chart, event),parentData);
      printElementsAtEvent(getElementsAtEvent(chart, event), parentData);

      const _childData = getChildDataV2(groupedList,categoryClicked);
      setChildData({..._childData});
      setShowSubCategoryData(true);
    }

    useEffect(() => {
      const filteredList = getFilteredList(groupedList);
      //const map = populateMapForParentCategories(filteredList);
      const map = populateMapForParentCategoriesV2(filteredList);
      const parentData = getChartDataFromMap(map); 
      setParentData(parentData);
    }, [])
   
  return (
      <div className='flex justify-center items-center h-[100vh]'>
        <div className='flex flex-col'>
          {/* <h3>Click on each category to know more</h3> */}
          {Object.keys(parentData).length > 0 && 
            <div>
              <Doughnut
                  ref={chartRef}
                  data = {parentData}       
                  onClick={handleCategoryClick}
                  options={rand}
                /> 
            </div>
          }
        </div>
        {
          showSubCategoryData &&  
          <div className='flex flex-col'>
              <Doughnut
                data = {childData}
                options={rand}
      
              /> 
          </div>
        }
      </div>
  )
}

export default ViewChart;
