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

const useFilterTransactions = () => {
    let transactionListFromRedux = useSelector((store) => store.transactions.transactionData);
    let currentFilterState = useSelector((store) => store.filter);
    const [list, setList] = useState([]);
    const [selection, setSelection] = useState('');

    const handleDropDownChange = (event) => {
        const selection = event.target.value;
        setSelection(selection);
    }

    const  {fromDate,toDate} = useMemo(() => {
        return getFilterValues(currentFilterState);
    },
    [currentFilterState])
    
    const filterForMonths = function filterForDates(transactionData) {
        function isDateBetween(dateToCheck, startDate, endDate) {
            return dateToCheck >= startDate && dateToCheck <= endDate;
        }
        const dateToCheck = new Date(transactionData.transactionDate);
        return isDateBetween(dateToCheck, fromDate, toDate);
    }

    useEffect(() => {
        const filteredList = transactionListFromRedux.filter(transaction => filterForMonths(transaction));
        setList([...filteredList]);
    },[currentFilterState,transactionListFromRedux]);

    useEffect(() => {
        let sortedList = [];
        if(selection === 'costLowToHigh') {
            sortedList = list.sort((a,b) => a.transactionAmount - b.transactionAmount);
            setList([...sortedList]);
        }
        else if(selection === 'costHighToLow') {
            sortedList =list.sort((a,b) => b.transactionAmount - a.transactionAmount);
            setList([...sortedList]);
        }
    },[selection]);

    return {
        list, handleDropDownChange
    }
}

export default useFilterTransactions