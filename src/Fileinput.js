import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateTransactions } from "./redux/transactionSlice";

const Fileinput = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFileAdded = (event) => {
        const inputFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(inputFile);

        fileReader.addEventListener('load', (event) => {

            const convertHTMLDataToTransactionArray = function getRawHTMLData(fileContents) {
                let dummyDiv = document.createElement('div');
                dummyDiv.innerHTML = fileContents;
                const transactionRows =  dummyDiv.getElementsByClassName('mdl-grid');
                let transactionRowsArray = Array.prototype.map.call(transactionRows, (x) => x);
                //remove the first div since it is a wrapper div
                transactionRowsArray = transactionRowsArray.splice(1);
                return transactionRowsArray;

            }
            const createTransactionObjectsFromRowData = function createTransactionObjectFromRowData(transactionRowData) {
                
                const createTransactionObject = function createTransactionObject(transactionRowDatum) {
                    const transformDateStringToDateObject = function transformDateStringToDateObject(dateString) {
                        const getMonthIndexFromString = function getMonthIndexFromString(monthName) {
                            switch(monthName.toUpperCase()) {
                                case 'JAN' :
                                    return 0;
                                case 'FEB' : 
                                    return 1;
                                case 'MAR' :
                                    return 2;
                                case 'APR' :
                                    return 3
                                case 'MAY' :
                                    return 4;
                                case 'JUN' :
                                    return 5;
                                case 'JUL' :
                                    return 6;
                                case 'AUG' :
                                    return 7;
                                case 'SEP' :
                                    return 8;
                                case 'OCT' :
                                    return 9;
                                case 'NOV' :
                                    return 10;
                                case 'DEC' :
                                    return 11;
                            }
                        }
                        const formDate = function formDate(monthAndDate, year, timeString) {
                            const regex = /[a-zA-Z]+|[0-9]+/g;
                            let [month, day] = monthAndDate.match(regex);
                            let yearInt = parseInt(year);
                            let monthIndex = getMonthIndexFromString(month);
                            day = parseInt(day);

                            timeString = timeString.trimStart();
                            timeString = timeString.trim();
                  
                            let [hours, minutes, , isAm, ] = timeString.match(regex);
                            if(isAm !== 'AM') {
                                hours = parseInt(hours) + 12;
                            }
                            minutes = parseInt(minutes);
                            return new Date(yearInt,monthIndex,day,hours,minutes).toDateString();
                        }
                        if(!dateString) {
                            return null;
                        }
                        let splittedDateString = dateString.split(',');
                        let returnedDate = formDate(splittedDateString[0],splittedDateString[1],splittedDateString[2]);
                        return returnedDate;
                    }
                    const getTransactionType = function getTransactionType(transactionRemarkRawText) {
                        if(transactionRemarkRawText.includes('Received')) {
                            return "RECIEVED";
                        }
                        else if(transactionRemarkRawText.includes('Sent') || transactionRemarkRawText.includes('Paid')) {
                            return "PAID";
                        }
                        else {
                            return "";
                        }
    
                    }
                    const getRecipientDetails = function getRecipientDetails(transactionType, transactionRemarkRawText) {
                        if(transactionType !== 'RECIEVED') {
                            let recipient = transactionRemarkRawText.match(/to (.+) using/);
                            if(!recipient) {
                                return 'Transfer From Account' 
                            }
                            else {
                               return recipient[1].toLowerCase();
                            }
                        }
                        else if(transactionType === "RECIEVED") {
                            return "Credited To Account";
                        }
                        return "";
                    }
                    const getTransactionAmount = function getTransactionAmount(transactionRemarkRawText) {
                        const matchedString = transactionRemarkRawText.match(/₹([\d,]+)/);
                        if(!matchedString) {
                            return null;
                        }
                        return parseFloat(matchedString[1].replace(/,/g, ''));
                    }
                    const getTransactionId = function getTransactionId() {
                        const uniqueId = uuidv4();
                        return uniqueId;
                    }
                    const transactionRemarkRawText = transactionRowDatum.childNodes[1].childNodes[0].nodeValue;

                    //check first if transaction was completed, the inner HTML will contain a string

                    if(!transactionRowDatum.innerText.includes('Completed')) {
                        return null;
                    }

                    let transactionDate = transformDateStringToDateObject(transactionRowDatum.childNodes[1].childNodes[2].nodeValue);
                    let transactionType = getTransactionType(transactionRemarkRawText);
                    let recipient = getRecipientDetails(transactionType, transactionRemarkRawText);
                    let transactionAmount = getTransactionAmount(transactionRemarkRawText)

                    if(!transactionAmount || !recipient || !transactionDate || !transactionType ) {
                        return null;
                    }
                    let transactionId = getTransactionId();
                    return {
                        transactionDate : transactionDate,
                        transactionType : transactionType,
                        recipient : recipient,
                        transactionAmount : transactionAmount,
                        transactionId : transactionId,
                        transactionTag : null
                    }
                    
                }
                const transactionList = Array.prototype.map.call(transactionRowData,createTransactionObject )
                const filteredList = transactionList.filter( transaction => transaction !== null)
                return filteredList;
            }
            const fileContents = event.target.result;
            const transactionRowsArray = convertHTMLDataToTransactionArray(fileContents);
            const transactionObjectList = createTransactionObjectsFromRowData(transactionRowsArray);
            // console.log(transactionObjectList);
            localStorage.setItem('transactions', JSON.stringify(transactionObjectList));
            dispatch(updateTransactions(transactionObjectList));
            navigate('/transactions');
            
        })
    }
    return (
        <input onChange={onFileAdded} type="file" id="fileInput" placeholder="Enter your file"/>
    )
}

export default Fileinput;