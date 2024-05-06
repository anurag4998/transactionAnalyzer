import React, { useState } from "react";
import { useDispatch , useSelector } from 'react-redux';
import { changeFilter } from "./redux/filterSlice";


const Filter = () => {
    const [isCustomDateEnabled, setIsCustomDateEnabled] = useState(false);
    let currentFilterState = useSelector((store) => store.filter);
    const dispatch = useDispatch();

    const dispatchAction = () => {
        const toDate = document.getElementById('datetime-local-to').value;
        const fromDate = document.getElementById('datetime-local-from').value;
        if(new Date(fromDate) > new Date(toDate)) {
            alert('From Date should start before To Date');
            return;
        }
        if(fromDate && toDate) {
            dispatch(changeFilter({type: 'customDate', fromDate, toDate}));
        }
        else {
            alert('either from or to date is not selected');
        }
    }
   
    const handleDropDownChange = (event) => {
        if(isCustomDateEnabled) {
            setIsCustomDateEnabled(!isCustomDateEnabled)
        }
        const selection = event.target.value;
        let selectionStringToDispatch = "";
        switch (selection) {
            case "currentMonth" : 
                selectionStringToDispatch = "currentMonth"
                break;
            case "previousMonth" : 
                selectionStringToDispatch = "previousMonth";
                break;
            case "lastThreeMonths" :
                selectionStringToDispatch = "lastThreeMonths";
                break;
            default:
                selectionStringToDispatch = "";
                setIsCustomDateEnabled(!isCustomDateEnabled)
                break;
        }
           
        if(selectionStringToDispatch){
            dispatch(changeFilter({type : selection}));
        }
    }
    return(
        <div className="p-2">
            <div>
                <select onChange={handleDropDownChange} defaultValue={currentFilterState.filterApplied || 'Select'}>
                    <option value="currentMonth">This Month</option>
                    <option value="previousMonth">Previous Month</option>
                    <option value = "lastThreeMonths">Last 3 Months</option>
                    <option value="customDate">Custom Range</option>
                </select>
            </div>
            {isCustomDateEnabled && 
            <div className="flex flex-row">
                <input  type="date" id="datetime-local-from"  className="mx-2 border-solid"/>
                <input  type="date" id="datetime-local-to" className="mx-2 border-solid"/>
                <button onClick={dispatchAction} className="bg-blue-500 rounded-md text-white text-center p-1 pr-4 pl-4 mx-2"> View </button>
            </div>
            }
        </div>
        
    )
}

export default Filter