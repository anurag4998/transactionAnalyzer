import React from "react";

const Card = ({transactionDate, transactionType, transactionAmount, recipient}) => {
    return (
        <div draggable = "true" className="transaction-card flex justify-between items-center cursor-pointer shadow-xl bg-[rgb(255,255,255)] w-5/12 h-28 rounded-lg p-2 m-4" >
            <div className="transaction-info flex flex-col w-[100%]">
                <div className="recipient text-md font-bold">
                    {recipient}
                </div>
                <div className="flex justify-between items-center ">
                    <div className="transaction-date font-medium my-2 text-sm">          
                        {new Date(transactionDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' } )}
                    </div>
                    <div className="transaction-amount bg-[#dc3545] w-20 h-5 font-semibold text-sm text-white text-center rounded-md ">
                        <span className="tetx-md font-semibold">₹ </span> {transactionAmount}
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default Card