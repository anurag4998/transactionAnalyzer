import React, { useState } from "react";
import Category from "./Category";
import categoryCatalog from "./utils/categoryCatalog";

const Cardv2 = (props) => {
    let iconComponent = null;
    if(props.transactionTag) {
        
        const category = categoryCatalog.filter((category) => category.name === props.transactionTag.category.toString())[0];
        const componentObject = category.subcategories.filter(subcategory => subcategory.displayName === props.transactionTag.subCategory)[0];
        iconComponent = componentObject;
    }
        
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
                   
                    <button className="category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm flex items-center" onClick={toggleModal}>
                        { props.transactionTag ? 
                            <>
                                <span className="mr-2">{iconComponent.component}</span>
                                <span>{iconComponent.displayName}</span>
                            </>
                            : 
                            'Assign a category'
                        }
                    </button> 
                }
                
                {openModal && <Category toggleModal = {toggleModal} isModalOpen = {openModal} transactionId = {props.transactionId}/>}
            </div>

        </div>
    )
}

export default Cardv2