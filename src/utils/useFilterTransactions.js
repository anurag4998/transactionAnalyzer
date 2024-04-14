import { useEffect, useState , useMemo} from 'react';
import { useSelector} from 'react-redux';

const getFilterValues = function getFilterValues(currentFilterState) {
    let fromDate = null;
    let toDate = null;
    if(currentFilterState.filterApplied === 'currentMonth') {
        const currentDate = new Date();
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        toDate = new Date();
    }
    else if(currentFilterState.filterApplied === 'previousMonth') {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        fromDate = new Date(currentYear, currentMonth - 1, 1);    
        toDate = new Date(currentYear, currentMonth, 0);
    }
    else if(currentFilterState.filterApplied === 'lastThreeMonths') {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        fromDate = new Date(currentYear, currentMonth - 3, 1);    
        toDate = new Date(currentYear, currentMonth, 0);
    }
    else {
        fromDate = new Date(currentFilterState.fromDate);
        toDate = new Date(currentFilterState.toDate);
    }

    return {fromDate, toDate}

}

const sortList = function sortList(selection, listToSort) {
      
    let sortedList = [];
    if(selection === 'costLowToHigh') {
        sortedList = listToSort.sort((a,b) => a.transactionAmount - b.transactionAmount);
    }
    else if(selection === 'costHighToLow') {
        sortedList =listToSort.sort((a,b) => b.transactionAmount - a.transactionAmount);
    }
    return sortedList;
}

const filterForMonths = function filterForDates(transactionData,fromDate,toDate) {
    function isDateBetween(dateToCheck, startDate, endDate) {
        return dateToCheck >= startDate && dateToCheck <= endDate;
    }
    const dateToCheck = new Date(transactionData.transactionDate);
    return isDateBetween(dateToCheck, fromDate, toDate);
}
const useFilterTransactions = () => {
    let transactionListFromRedux = useSelector((store) => store.transactions.transactionData);
    let currentFilterState = useSelector((store) => store.filter);
    const [list, setList] = useState([]);
    const [selection, setSelection] = useState('costHighToLow');

    const handleDropDownChange = (event) => {
        const selection = event.target.value;
        setSelection(selection);
    }
    const {fromDate,toDate} = useMemo(() => {
        return getFilterValues(currentFilterState);
    },
    [currentFilterState])

    useEffect(() => {

        const filteredList = transactionListFromRedux.filter(transaction => filterForMonths(transaction,fromDate,toDate));
        if(selection) {
            const sortedList = sortList(selection, filteredList);
            setList([...sortedList]);
        }
        else {
            setList([...filteredList]);
        }

    },[currentFilterState,transactionListFromRedux]);

    useEffect(() => {
        if(list.length > 0) {
            const sortedList = sortList(selection, list);
            setList([...sortedList]);
        }
    },[selection]);
    return {
        list, handleDropDownChange
    }
}

export default useFilterTransactions;