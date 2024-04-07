import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const countTransactionsByName = function groupTransactionsByName(list, numberOfResults, sortType) {

    function TransactionObject(recepientName, totalTransactionAmount,transactionType) {
        this.recepientName = recepientName;
        this.totalTransactionAmount = totalTransactionAmount;
        this.transactionCount = 1;
        this.transactionType = transactionType;
    }
      
    if(list && list.length === 0) {
        return [];
    }
    const map = new Map();
    const updateObject = function(amountObject, transactionAmount) {
        amountObject.totalTransactionAmount += transactionAmount;
        amountObject.transactionCount += 1;
        return amountObject;
    }
    list.forEach(element => {   
        const recepientName = element.recipient;
        const transactionAmount = element.transactionAmount;
        const transactionType = element.transactionType;
        if(map.has(element.recipient)) {
            const amountObject = map.get(recepientName);
            map.set(recepientName, updateObject(amountObject,transactionAmount));
        }
        else {
            const amountObject = new TransactionObject(recepientName,transactionAmount,transactionType);
            map.set(recepientName, amountObject);
        }
    });

    let sortedArray = Array.from(map);
    if(sortType === 'frequency') {
        sortedArray.sort((a, b) => b[1].transactionCount - a[1].transactionCount);
    }
    else if(sortType === 'value') {
        sortedArray.sort((a, b) => b[1].totalTransactionAmount - a[1].totalTransactionAmount);
    }
    sortedArray = sortedArray.filter((item,index) => index < numberOfResults);
    console.log(sortedArray)
    return sortedArray;

}

const ViewTransactions = ({transactionList, sortType, title}) => {
    const [accordionState, setAccordionState] = useState(true);
    const [numberOfResults, setNumberOfResults] = useState(5);
    const list = countTransactionsByName(transactionList, numberOfResults,sortType);
    const handleClick = function handleClick() {
        setAccordionState(!accordionState);
    }
    const handleDropDownChange = function(event) {
        event.stopPropagation();
        let selection = parseInt(event.target.value);
        setNumberOfResults(selection);
    }
    if(list.length === 0) {
        return (
            <div></div>
        )
    }
    return (
        <div className= {`most-frequent-wrapper m-3 rounded-lg shadow-md`}>
            <div onClick = {handleClick} className = { `flex cursor-pointer p-2 items-center justify-between hover:bg-[#f2f2f2]  ${accordionState ? 'bg-[#f2f2f2] rounded-t-lg' : 'bg-[#fff] rounded-lg'}`}>
                    <h1 className="font-semibold text-lg py-2"> {title}</h1>
                    <span className="py-2"> {accordionState ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
            </div>
            {
                accordionState && 
                <div className="bg-[#fff] px-2 py-2">
                    <select onChange={handleDropDownChange} className="h-8 cursor-pointer" >
                        <option value="5">Top 5</option>
                        <option value="10">Top 10</option>
                        <option value="15">Top 15</option>
                    </select>
                </div>
            }
            
            <div className={`row-wrapper rounded-b-lg ${accordionState ? 'pb-1' : 'pb-0'}`}>
                    {accordionState && list.map ( (groupedTransaction) => {
                        return (
                            <div key = {groupedTransaction[1].recepientName} className= { `flex flex-row justify-between items-center py-3 px-3 bg-[#fff]`}>
                                <div className="transaction-info">
                                    <span className="capitalize">{groupedTransaction[1].recepientName }</span>
                                    <div>
                                        <span className="text-sm capitalize  text-[#818181] text-wrap"> {groupedTransaction[1].transactionCount} Transactions - </span>
                                        <span className="text-sm capitalize  text-[#818181] text-wrap"> ₹ {groupedTransaction[1].totalTransactionAmount} {groupedTransaction[1].transactionType === 'PAID'? 'spent' : 'credited'}</span>
                                    </div>
                                </div>
                                <button className="category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm">
                                    Assign a category
                                </button>
                            </div>                    
                        )
                    })}
            </div>            
        </div>
    )
}

export default ViewTransactions;