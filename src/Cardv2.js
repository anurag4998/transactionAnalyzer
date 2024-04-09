import React, { useState } from "react";
import Category from "./Category";
const Cardv2 = (props) => {
    console.log(props);
    const [openModal, setIsOpenModal] = useState(false);
    const toggleModal = () => {
        setIsOpenModal(!openModal)
    }
    return (
        <div className="card flex flex-col shadow-xl bg-[rgb(255,255,255)] w-5/12 rounded-lg m-4 ">
            <div className="flex flex-row justify-between items-center p-2 border-b-2">
                <div className="recipient text-sm capitalize  text-[#818181] text-wrap">
                    {props.recipient}
                </div>
                <div className="transaction-date text-sm text-[#818181] ">          
                        {new Date(props.transactionDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' } )}
                </div>
            </div>
            <div className="flex flex-row justify-between items-center p-2 min-h-15 mt-1">
                <div className="transaction-amount w-20 h-10 font-bold text-xl flex items-center justify-center pl-2">
                        <span className="mr-1 font-semibold"> {props.transactionType === 'PAID' ? "-" : "+" } </span>
                        <span className="text-md mr-1 font-semibold tight-letter-spacing">₹ </span> {props.transactionAmount}
                </div>
                {
                    tagName ?  tagName :
                    <button className="category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm" onClick={toggleModal}>
                        Assign a category
                    </button> 
                }
                
                {/* {openModal && <Category toggleModal = {toggleModal} isModalOpen = {openModal} transactionId = {transactionId}/>} */}
            </div>

        </div>
    )
}

export default Cardv2