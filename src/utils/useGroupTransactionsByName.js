import React from "react";
import categoryCatalog from "./categoryCatalog";


const useGroupTransactionsByName = function groupTransactionsByName(list, numberOfResults, groupBy) {

    function TransactionObject(recipientName, totalTransactionAmount,transactionType,iconComponent) {
        this.recipientName = recipientName;
        this.totalTransactionAmount = totalTransactionAmount;
        this.transactionCount = 1;
        this.transactionType = transactionType;
        this.iconComponent = iconComponent;
    }
      
    if(list && list.length === 0) {
        return [];
    }
    const map = new Map();
    const updateObject = function(amountObject, transactionAmount) {
        amountObject.totalTransactionAmount += transactionAmount;
        amountObject.transactionCount += 1;
        return amountObject;
    }
    list.forEach(element => {   
        const recipientName = element.recipient;
        const transactionAmount = element.transactionAmount;
        const transactionType = element.transactionType;
        const transactionTag = element.transactionTag;
        let iconComponent = null;
        if(transactionTag) {
            
            const categoryObject = categoryCatalog.filter((category) => category.name === transactionTag.category.toString())[0];
            let componentObject = categoryObject.subcategories.filter(subcategory => subcategory.displayName === transactionTag.subCategory)[0];
            componentObject = {...componentObject, category: categoryObject.name};
            iconComponent = componentObject;
        }
        if(map.has(element.recipient)) {
            const amountObject = map.get(recipientName);
            map.set(recipientName, updateObject(amountObject,transactionAmount));
        }
        else {
            const amountObject = new TransactionObject(recipientName,transactionAmount,transactionType,iconComponent);
            map.set(recipientName, amountObject);
        }
    });

    let sortedArray = Array.from(map);
    if(groupBy === 'frequency') {
        sortedArray.sort((a, b) => b[1].transactionCount - a[1].transactionCount);
    }
    else if(groupBy === 'value') {
        sortedArray.sort((a, b) => b[1].totalTransactionAmount - a[1].totalTransactionAmount);
    }
    sortedArray = sortedArray.filter((item,index) => index < numberOfResults);
    return sortedArray;

}

export default useGroupTransactionsByName;