import React from "react";
import { useNavigate } from "react-router-dom";

import Cardv2 from "./Cardv2";
import Filter from "./filter";
import useFilterTransactions from "./utils/useFilterTransactions";
import ViewTransactions from "./ViewTransactions";

const Viewer = () => {
    let {list : transactionList, handleDropDownChange} =  useFilterTransactions();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/chart',{ state: { transactionList } });
    }
    if(!transactionList) {
        return (
            <div>
                No Transactions to display
            </div>
        )
    }
    return (
        <div>
            <div>
                <Filter />
            </div>
            <div className="flex h-[90vh] justify-center items-center border-4 my-auto relative">
                <div className="draggableParent max-w-[50%] flex-grow border-2 overflow-y-scroll h-[100%] bg-slate-50">
                    <select onChange={handleDropDownChange} className="h-8" defaultValue={"costHighToLow"} >
                        <option value="">Select an option</option>
                        <option value="costLowToHigh">Cost Low to High</option>
                        <option value="costHighToLow">Cost High to Low</option>
                        <option value="untagged">Untagged Transactions</option>
                    </select>
                
                    <div className="flex justify-evenly flex-wrap">
                    {
                        transactionList.map( ({transactionDate,transactionType,recipient,transactionAmount,transactionId, transactionTag}) => {
                        return <Cardv2 key = {transactionId} transactionDate = {transactionDate} transactionId={transactionId} transactionType = {transactionType} transactionAmount = {transactionAmount}
                            recipient={recipient} transactionTag = {transactionTag} />
                        })
                    }
                    </div>
                </div>
                <div className="droppableParent flex-grow h-[100%] bg-slate-50 overflow-y-scroll">
                    <ViewTransactions transactionList = {transactionList} sortType={"frequency"} title = {"Top transactions by frequency"}/>
                    <ViewTransactions transactionList = {transactionList} sortType={"value"} title = {"Top transactions by value"}/>
                </div>
                <div className="absolute bottom-[-35px] right-4">
                    <button onClick={handleClick} className="z-20 shadow-lg border-solid rounded-full p-2 h-[70px] w-[70px] bg-slate-600 text-[#fff] text-sm"> Analyze </button>
                </div>
            </div>
        </div>
        
    )
}

export default Viewer
