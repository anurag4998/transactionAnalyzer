import React, { useState , useEffect, useMemo} from "react";
import { useSelector} from 'react-redux';
import Card from "./Card";
import Cardv2 from "./Cardv2";
import Filter from "./filter";
import useFilterTransactions from "./utils/useFilterTransactions";
import ViewTransactions from "./ViewTransactions";

const Viewer = () => {
    let {list : transactionList, handleDropDownChange} =  useFilterTransactions();
    console.log(transactionList);
    return (
        <div>
            <div>
                <Filter />
            </div>
            <div className="flex h-[90vh] justify-center items-center border-4 my-auto">
                <div className="draggableParent max-w-[50%] flex-grow border-2 overflow-y-scroll h-[100%] bg-slate-50">
                    <select onChange={handleDropDownChange} className="h-8" >
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
            </div>
        </div>
        
    )
}

export default Viewer
