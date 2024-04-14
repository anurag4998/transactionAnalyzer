import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import ViewTransactionRow from "./ViewTransactionRow";
import useGroupTransactionsByName from "./utils/useGroupTransactionsByName";

const ViewTransactions = ({transactionList, sortType, title}) => {
    const [accordionState, setAccordionState] = useState(true);
    const [numberOfResults, setNumberOfResults] = useState(5);

    const list = useGroupTransactionsByName(transactionList, numberOfResults,sortType);
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
                            <ViewTransactionRow key = {groupedTransaction[1].recipientName} recipientName = {groupedTransaction[1].recipientName} transactionCount = {groupedTransaction[1].transactionCount} 
                            totalTransactionAmount = {groupedTransaction[1].totalTransactionAmount} transactionType = {groupedTransaction[1].transactionType} iconComponent = {groupedTransaction[1].iconComponent}  />               
                        )
                    })}
            </div>            
        </div>
    )
}

export default ViewTransactions;