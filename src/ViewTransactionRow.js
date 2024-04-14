import React, { useState } from "react";
import Category from "./Category";

const ViewTransactionRow = ({recipientName,transactionCount,totalTransactionAmount,transactionType,iconComponent}) => {
    const [openModal, setIsOpenModal] = useState(false);
    const toggleModal = () => {
        setIsOpenModal(!openModal)
    }
    return (
        <div key = {recipientName} className= { `flex flex-row justify-between items-center py-3 px-3 bg-[#fff]`}>
                <div className="transaction-info">
                    <span className="capitalize">{recipientName }</span>
                    <div>
                        <span className="text-sm capitalize  text-[#818181] text-wrap"> {transactionCount} Transactions - </span>
                        <span className="text-sm capitalize  text-[#818181] text-wrap"> ₹ {totalTransactionAmount} {transactionType === 'PAID'? 'spent' : 'credited'}</span>
                    </div>
                </div>
                {(recipientName !== 'Transfer From Account' && 
                    recipientName !== 'Credited To Account') &&
                <button className="category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm flex items-center" onClick={toggleModal}>
                    {iconComponent ? 
                        <>
                            <span className="mr-2">{iconComponent.component}</span>
                            <span>{iconComponent.displayName}</span>
                        </>
                    : 'Assign a category'}
                </button>
                }
                {openModal && <Category toggleModal = {toggleModal} isModalOpen = {openModal} transactionId={''} recipientName = {recipientName}/>}
        </div>
    )

}

export default ViewTransactionRow