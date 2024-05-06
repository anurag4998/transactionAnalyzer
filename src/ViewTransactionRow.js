import React, { useState } from "react";
import Category from "./Category";
import { FaCheckDouble } from "react-icons/fa";

const ViewTransactionRow = ({recipientName,transactionCount,totalTransactionAmount,transactionType,iconComponent}) => {
    const [openModal, setIsOpenModal] = useState(false);
    const [categoryAssigned, isCategoryAssigned] = useState(false);
    const toggleModal = () => {
        setIsOpenModal(!openModal)
    }

    return (
        <div key = {recipientName} className= { `flex flex-row justify-between items-center py-3 px-3 bg-[#fff]`}>
                <div className="transaction-info">
                    <div className="capitalize flex">
                        <span className="mr-2">{recipientName} </span>
                        <span className="text-xs"> {categoryAssigned && <FaCheckDouble/ > } </span>  
                    </div>
                    <div>
                        <span className="text-sm capitalize  text-[#818181] text-wrap"> {transactionCount} Transactions - </span>
                        <span className="text-sm capitalize  text-[#818181] text-wrap"> ₹ {totalTransactionAmount} {transactionType === 'PAID'? 'spent' : 'credited'}</span>
                    </div>
                </div>
                {(recipientName !== 'Transfer From Account' && 
                    recipientName !== 'Credited To Account') &&
                <button className="category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm flex items-center" onClick={toggleModal}>
                    Assign category to all
                </button>
                }
                {openModal && <Category toggleModal = {toggleModal} isModalOpen = {openModal} transactionId={''} recipientName = {recipientName} isCategoryAssigned={isCategoryAssigned}/>}
        </div>
    )

}

export default ViewTransactionRow