require("./app.css");
var $8OivB$reactjsxruntime = require("react/jsx-runtime");
var $8OivB$react = require("react");
var $8OivB$reactdomclient = require("react-dom/client");
var $8OivB$reactrouterdom = require("react-router-dom");
var $8OivB$reactredux = require("react-redux");
var $8OivB$uuid = require("uuid");
var $8OivB$reduxjstoolkit = require("@reduxjs/toolkit");
var $8OivB$reactmodal = require("react-modal");
var $8OivB$reacticonsri = require("react-icons/ri");
var $8OivB$reacticonsbi = require("react-icons/bi");
var $8OivB$reacticonscg = require("react-icons/cg");
var $8OivB$reacticonsci = require("react-icons/ci");
var $8OivB$reacticonsfa = require("react-icons/fa");
var $8OivB$reacticonsfa6 = require("react-icons/fa6");
var $8OivB$reacticonsgi = require("react-icons/gi");
var $8OivB$reacticonsio = require("react-icons/io");
var $8OivB$reacticonsio5 = require("react-icons/io5");
var $8OivB$reacticonslu = require("react-icons/lu");
var $8OivB$reacticonsmd = require("react-icons/md");
var $8OivB$reacticonspi = require("react-icons/pi");
var $8OivB$reacticonssi = require("react-icons/si");
var $8OivB$reacticonstb = require("react-icons/tb");
var $8OivB$chartjs = require("chart.js");
var $8OivB$reactchartjs2 = require("react-chartjs-2");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}










const $97ce3d639f0037f7$var$transactionSlice = (0, $8OivB$reduxjstoolkit.createSlice)({
    name: "Transactions",
    initialState: {
        transactionData: [],
        filteredTransactionData: []
    },
    reducers: {
        updateTransactions: (state, action)=>{
            state.transactionData = [
                ...state.transactionData,
                ...action.payload
            ];
        },
        updateFilteredTransactionData: (state, action)=>{
            state.filteredTransactionData.length = 0;
            state.filteredTransactionData = [
                ...state.filteredTransactionData,
                ...action.payload
            ];
        },
        updateTransactionById: (state, action)=>{
            const transactionId = action.payload.transactionId;
            const transactionTag = action.payload.transactionTag;
            const updatedArr = [
                ...state.transactionData
            ];
            const index = state.transactionData.findIndex((item)=>item.transactionId === transactionId);
            if (index !== -1) state.transactionData[index] = {
                ...state.transactionData[index],
                transactionTag: transactionTag
            };
        },
        updateTransactionByName: (state, action)=>{
            const recipientName = action.payload.recipientName;
            const transactionTag = action.payload.transactionTag;
            const indexArray = state.transactionData.map((item, index)=>{
                if (item.recipient.toLowerCase() === recipientName.toLowerCase()) return index;
                else return null;
            });
            indexArray.forEach(function(index) {
                if (index) state.transactionData[index] = {
                    ...state.transactionData[index],
                    transactionTag: transactionTag
                };
            });
        }
    }
});
const { updateTransactions: $97ce3d639f0037f7$export$85992c4a3fdac45b, updateFilteredTransactionData: $97ce3d639f0037f7$export$ae376a9eefd32cc0, updateTransactionById: $97ce3d639f0037f7$export$f4cc2c57916efcf3, updateTransactionByName: $97ce3d639f0037f7$export$4f05c10fc54322a3 } = $97ce3d639f0037f7$var$transactionSlice.actions;
var $97ce3d639f0037f7$export$2e2bcd8739ae039 = $97ce3d639f0037f7$var$transactionSlice.reducer;


const $12cdbc2a42be128f$var$Fileinput = ()=>{
    const navigate = (0, $8OivB$reactrouterdom.useNavigate)();
    const dispatch = (0, $8OivB$reactredux.useDispatch)();
    const onFileAdded = (event)=>{
        const inputFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsText(inputFile);
        fileReader.addEventListener("load", (event)=>{
            const convertHTMLDataToTransactionArray = function getRawHTMLData(fileContents) {
                let dummyDiv = document.createElement("div");
                dummyDiv.innerHTML = fileContents;
                const transactionRows = dummyDiv.getElementsByClassName("mdl-grid");
                let transactionRowsArray = Array.prototype.map.call(transactionRows, (x)=>x);
                //remove the first div since it is a wrapper div
                transactionRowsArray = transactionRowsArray.splice(1);
                return transactionRowsArray;
            };
            const createTransactionObjectsFromRowData = function createTransactionObjectFromRowData(transactionRowData) {
                const createTransactionObject = function createTransactionObject(transactionRowDatum) {
                    const transformDateStringToDateObject = function transformDateStringToDateObject(dateString) {
                        const getMonthIndexFromString = function getMonthIndexFromString(monthName) {
                            switch(monthName.toUpperCase()){
                                case "JAN":
                                    return 0;
                                case "FEB":
                                    return 1;
                                case "MAR":
                                    return 2;
                                case "APR":
                                    return 3;
                                case "MAY":
                                    return 4;
                                case "JUN":
                                    return 5;
                                case "JUL":
                                    return 6;
                                case "AUG":
                                    return 7;
                                case "SEP":
                                    return 8;
                                case "OCT":
                                    return 9;
                                case "NOV":
                                    return 10;
                                case "DEC":
                                    return 11;
                            }
                        };
                        const formDate = function formDate(monthAndDate, year, timeString) {
                            const regex = /[a-zA-Z]+|[0-9]+/g;
                            let [month, day] = monthAndDate.match(regex);
                            let yearInt = parseInt(year);
                            let monthIndex = getMonthIndexFromString(month);
                            day = parseInt(day);
                            timeString = timeString.trimStart();
                            timeString = timeString.trim();
                            let [hours, minutes, , isAm] = timeString.match(regex);
                            if (isAm !== "AM") hours = parseInt(hours) + 12;
                            minutes = parseInt(minutes);
                            return new Date(yearInt, monthIndex, day, hours, minutes).toDateString();
                        };
                        if (!dateString) return null;
                        let splittedDateString = dateString.split(",");
                        let returnedDate = formDate(splittedDateString[0], splittedDateString[1], splittedDateString[2]);
                        return returnedDate;
                    };
                    const getTransactionType = function getTransactionType(transactionRemarkRawText) {
                        if (transactionRemarkRawText.includes("Received")) return "RECIEVED";
                        else if (transactionRemarkRawText.includes("Sent") || transactionRemarkRawText.includes("Paid")) return "PAID";
                        else return "";
                    };
                    const getRecipientDetails = function getRecipientDetails(transactionType, transactionRemarkRawText) {
                        if (transactionType !== "RECIEVED") {
                            let recipient = transactionRemarkRawText.match(/to (.+) using/);
                            if (!recipient) return "Transfer From Account";
                            else return recipient[1].toLowerCase();
                        } else if (transactionType === "RECIEVED") return "Credited To Account";
                        return "";
                    };
                    const getTransactionAmount = function getTransactionAmount(transactionRemarkRawText) {
                        const matchedString = transactionRemarkRawText.match(/₹([\d,]+)/);
                        if (!matchedString) return null;
                        return parseFloat(matchedString[1].replace(/,/g, ""));
                    };
                    const getTransactionId = function getTransactionId() {
                        const uniqueId = (0, $8OivB$uuid.v4)();
                        return uniqueId;
                    };
                    const transactionRemarkRawText = transactionRowDatum.childNodes[1].childNodes[0].nodeValue;
                    //check first if transaction was completed, the inner HTML will contain a string
                    if (!transactionRowDatum.innerText.includes("Completed")) return null;
                    let transactionDate = transformDateStringToDateObject(transactionRowDatum.childNodes[1].childNodes[2].nodeValue);
                    let transactionType = getTransactionType(transactionRemarkRawText);
                    let recipient = getRecipientDetails(transactionType, transactionRemarkRawText);
                    let transactionAmount = getTransactionAmount(transactionRemarkRawText);
                    if (!transactionAmount || !recipient || !transactionDate || !transactionType) return null;
                    let transactionId = getTransactionId();
                    return {
                        transactionDate: transactionDate,
                        transactionType: transactionType,
                        recipient: recipient,
                        transactionAmount: transactionAmount,
                        transactionId: transactionId,
                        transactionTag: null
                    };
                };
                const transactionList = Array.prototype.map.call(transactionRowData, createTransactionObject);
                const filteredList = transactionList.filter((transaction)=>transaction !== null);
                return filteredList;
            };
            const fileContents = event.target.result;
            const transactionRowsArray = convertHTMLDataToTransactionArray(fileContents);
            const transactionObjectList = createTransactionObjectsFromRowData(transactionRowsArray);
            // console.log(transactionObjectList);
            localStorage.setItem("transactions", JSON.stringify(transactionObjectList));
            dispatch((0, $97ce3d639f0037f7$export$85992c4a3fdac45b)(transactionObjectList));
            navigate("/transactions");
        });
    };
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("input", {
        onChange: onFileAdded,
        type: "file",
        id: "fileInput",
        placeholder: "Enter your file"
    });
};
var $12cdbc2a42be128f$export$2e2bcd8739ae039 = $12cdbc2a42be128f$var$Fileinput;




























const $0962f540de4767ed$var$categoryCatalog = [
    {
        name: "Food & Drinks",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsio5.IoFastFood), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Food & Drinks"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiSwiggy), {}),
                displayName: "Swiggy"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiZomato), {}),
                displayName: "Zomato"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdBrunchDining), {}),
                displayName: "Eating Out"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCakeSlice), {}),
                displayName: "Desserts"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsbi.BiDrink), {}),
                displayName: "Drinks"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiFrenchFries), {}),
                displayName: "Snacks"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Shopping",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaShoppingBag), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Shopping"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdLocalGroceryStore), {}),
                displayName: "Grocery"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiClothes), {}),
                displayName: "Clothes"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaAmazon), {}),
                displayName: "Amazon"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiFlipkart), {}),
                displayName: "Flipkart"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiConverseShoe), {}),
                displayName: "Shoes"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdLaptop), {}),
                displayName: "Electronics"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonspi.PiBooks), {}),
                displayName: "Books"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdOutlineChair), {}),
                displayName: "Furniture"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiLipstick), {}),
                displayName: "Cosmetics"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Entertainment",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaBusAlt), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Entertainment"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsbi.BiCameraMovie), {}),
                displayName: "Movies"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuMic2), {}),
                displayName: "Shows"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Transport",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaBusAlt), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Transport"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiUber), {}),
                displayName: "Uber"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaTrainSubway), {}),
                displayName: "Metro/Local"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaTrain), {}),
                displayName: "Train"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaBus), {}),
                displayName: "Bus"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsio5.IoAirplane), {}),
                displayName: "Airplane"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaTaxi), {}),
                displayName: "Taxi"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsri.RiEBikeLine), {}),
                displayName: "Rapido"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Bills",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaHouseUser), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Utilities"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaSatelliteDish), {}),
                displayName: "DTH"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdElectricBolt), {}),
                displayName: "Electricity"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsmd.MdWaterDrop), {}),
                displayName: "Water"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiHouse), {}),
                displayName: "Rent"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Fitness",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaHouseUser), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Fitness"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsio.IoIosFootball), {}),
                displayName: "Football"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiTennisRacket), {}),
                displayName: "Tennis"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiShuttlecock), {}),
                displayName: "Badminton"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonscg.CgGym), {}),
                displayName: "Gym"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiGymBag), {}),
                displayName: "Equipment"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsci.CiPillsBottle1), {}),
                displayName: "Nutrition"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Medical",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaHouseUser), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Medical"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaBriefcaseMedical), {}),
                displayName: "Doctor"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiMedicines), {}),
                displayName: "Medicines"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsgi.GiHypodermicTest), {}),
                displayName: "Tests"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaTooth), {}),
                displayName: "Dentist"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    },
    {
        name: "Subscription",
        defaultIcon: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaHouseUser), {}),
        defaultComponent: {
            iconComponent: null,
            displayName: "Subscription"
        },
        subcategories: [
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsri.RiNetflixFill), {}),
                displayName: "Netflix"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiPrimevideo), {}),
                displayName: "Prime"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonstb.TbBrandBumble), {}),
                displayName: "Bumble"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaYoutube), {}),
                displayName: "Youtube"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaSpotify), {}),
                displayName: "Spotify"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa6.FaApple), {}),
                displayName: "Apple"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonssi.SiGooglescholar), {}),
                displayName: "Learning"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonstb.TbBrandDisney), {}),
                displayName: "Disney"
            },
            {
                iconComponent: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonslu.LuCircleDashed), {}),
                displayName: "No Icon"
            }
        ]
    }
];
var $0962f540de4767ed$export$2e2bcd8739ae039 = $0962f540de4767ed$var$categoryCatalog;


const $ddea889417ffec32$var$customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "none",
        minWidth: "20%",
        maxWidth: "50vW",
        maxHeight: "90vH",
        borderRadius: "15px",
        border: "1px solid #313131"
    },
    modalContent: {
        position: "relative",
        padding: "1rem",
        overflowY: "scroll",
        backgroundColor: "rgb(248 250 252)"
    },
    closeButton: {
        color: "black",
        padding: "5px",
        fontSize: "26px",
        cursor: "pointer",
        border: "none",
        outline: "none",
        position: "absolute",
        right: 0,
        zIndex: 100
    }
};
const $ddea889417ffec32$var$Category = ({ toggleModal: toggleModal, isModalOpen: isModalOpen, transactionId: transactionId, recipientName: recipientName, setTransactionTag: setTransactionTag, transactionTag: transactionTag })=>{
    console.log(transactionTag);
    const dispatch = (0, $8OivB$reactredux.useDispatch)();
    function closeModal() {
        toggleModal(false);
    }
    const handleSelection = function(transactionTag) {
        console.log(transactionTag);
        if (transactionId) dispatch((0, $97ce3d639f0037f7$export$f4cc2c57916efcf3)({
            transactionId: transactionId,
            transactionTag: transactionTag
        }));
        else if (recipientName) {
            dispatch((0, $97ce3d639f0037f7$export$4f05c10fc54322a3)({
                recipientName: recipientName,
                transactionTag: transactionTag
            }));
            if (setTransactionTag) setTransactionTag(transactionTag);
        }
        closeModal();
    };
    const onCardClick = function onCardClick(categoryName, subcategory) {
        //setTransactionTag({'category': categoryName, 'subCategory' :subcategory.displayName}) 
        handleSelection({
            "category": categoryName,
            "subCategory": subcategory.displayName
        });
    };
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
        children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)((0, ($parcel$interopDefault($8OivB$reactmodal))), {
            isOpen: isModalOpen,
            onRequestClose: closeModal,
            contentLabel: "Example Modal",
            ariaHideApp: false,
            style: $ddea889417ffec32$var$customStyles,
            shouldCloseOnEsc: true,
            children: [
                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("button", {
                    style: $ddea889417ffec32$var$customStyles.closeButton,
                    onClick: closeModal,
                    children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsri.RiCloseCircleFill), {})
                }),
                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                    style: $ddea889417ffec32$var$customStyles.modalContent,
                    children: (0, $0962f540de4767ed$export$2e2bcd8739ae039).map(function(category) {
                        const categoryName = category["name"];
                        return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                            className: "category-row mb-2 mt-2 shadow-md p-4 rounded-lg bg-white",
                            children: [
                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                                    className: "heading-wrapper mb-3",
                                    children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("h1", {
                                        className: "heading text-[#333] text-md font-semibold",
                                        children: categoryName
                                    })
                                }),
                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                                    className: "flex flex-row flex-nowrap pr-2 overflow-x-scroll p-2",
                                    children: category["subcategories"].map(function(subCategory) {
                                        return transactionTag && transactionTag.subCategory === subCategory.displayName ? /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                            onClick: ()=>onCardClick(categoryName, subCategory),
                                            className: "flex flex-col justify-evenly mr-4 items-center shadow-sm min-h-20 min-w-20 p-2 cursor-pointer rounded-md border-2 border-[#666]",
                                            children: [
                                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                                    className: "text-xl",
                                                    children: [
                                                        subCategory.iconComponent,
                                                        " "
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                                    className: "text-xs text-[#818181] ",
                                                    children: [
                                                        subCategory.displayName,
                                                        " "
                                                    ]
                                                })
                                            ]
                                        }, subCategory.displayName) : /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                            onClick: ()=>onCardClick(categoryName, subCategory),
                                            className: "flex flex-col justify-evenly mr-4 items-center shadow-sm min-h-20 min-w-20 p-2 cursor-pointer rounded-md border-2 border-[#f1f1f1]",
                                            children: [
                                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                                    className: "text-xl",
                                                    children: [
                                                        subCategory.iconComponent,
                                                        " "
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                                                    className: "text-xs text-[#818181] ",
                                                    children: [
                                                        subCategory.displayName,
                                                        " "
                                                    ]
                                                })
                                            ]
                                        }, subCategory.displayName);
                                    })
                                })
                            ]
                        }, categoryName);
                    })
                })
            ]
        })
    });
};
var $ddea889417ffec32$export$2e2bcd8739ae039 = $ddea889417ffec32$var$Category;



const $8747685eb783d3d2$var$Cardv2 = (props)=>{
    const [transactionTag, setTransactionTag] = (0, $8OivB$react.useState)("");
    let iconComponentObject = null;
    if (props.transactionTag) {
        if (props.transactionTag.subCategory === "No Icon") {
            const componentObject = (0, $0962f540de4767ed$export$2e2bcd8739ae039).filter((category)=>category.name === props.transactionTag.category.toString())[0];
            iconComponentObject = componentObject.defaultComponent;
        } else {
            const category = (0, $0962f540de4767ed$export$2e2bcd8739ae039).filter((category)=>category.name === props.transactionTag.category.toString())[0];
            const componentObject = category.subcategories.filter((subcategory)=>subcategory.displayName === props.transactionTag.subCategory)[0];
            iconComponentObject = componentObject;
        }
    }
    const [openModal, setIsOpenModal] = (0, $8OivB$react.useState)(false);
    const toggleModal = ()=>{
        setIsOpenModal(!openModal);
    };
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        className: "card flex flex-col shadow-xl bg-[rgb(255,255,255)] sm:w-12/12 lg:w-5/12 rounded-lg m-4 ",
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                className: "flex flex-row justify-between items-center p-2 border-b-2 w-[100%]",
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                        className: "recipient text-sm capitalize  text-[#818181] text-wrap",
                        children: props.recipient
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                        className: "transaction-date text-sm text-[#818181] ",
                        children: new Date(props.transactionDate).toLocaleDateString("en-IN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                className: "flex flex-row justify-between items-center p-2 min-h-15 mt-1",
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                        className: "transaction-amount w-20 h-10 font-bold text-xl flex items-center justify-center pl-2",
                        children: [
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                                className: "mr-1 font-semibold",
                                children: [
                                    " ",
                                    props.transactionType === "PAID" ? "-" : "+",
                                    " "
                                ]
                            }),
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("span", {
                                className: "text-md mr-1 font-semibold tight-letter-spacing",
                                children: "\u20B9 "
                            }),
                            " ",
                            props.transactionAmount
                        ]
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("button", {
                        className: "category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm flex items-center",
                        onClick: toggleModal,
                        children: props.transactionTag ? /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)((0, $8OivB$reactjsxruntime.Fragment), {
                            children: [
                                iconComponentObject.iconComponent && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("span", {
                                    className: "mr-2",
                                    children: iconComponentObject.iconComponent
                                }),
                                /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("span", {
                                    children: iconComponentObject.displayName
                                })
                            ]
                        }) : "Assign a category"
                    }),
                    openModal && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $ddea889417ffec32$export$2e2bcd8739ae039), {
                        toggleModal: toggleModal,
                        isModalOpen: openModal,
                        transactionId: props.transactionId,
                        recipientName: "",
                        setTransactionTag: setTransactionTag,
                        transactionTag: transactionTag
                    })
                ]
            })
        ]
    });
};
var $8747685eb783d3d2$export$2e2bcd8739ae039 = $8747685eb783d3d2$var$Cardv2;






const $061d4b686ac304a4$var$filterSlice = (0, $8OivB$reduxjstoolkit.createSlice)({
    name: "Filter",
    initialState: {
        filterApplied: "currentMonth",
        fromDate: null,
        toDate: null
    },
    reducers: {
        changeFilter: (state, action)=>{
            if (action.payload.type === "customDate") {
                state.filterApplied = action.payload.type;
                state.fromDate = action.payload.fromDate;
                state.toDate = action.payload.toDate;
            }
            state.filterApplied = action.payload.type;
        }
    }
});
const { changeFilter: $061d4b686ac304a4$export$347972a19297a2b7 } = $061d4b686ac304a4$var$filterSlice.actions;
var $061d4b686ac304a4$export$2e2bcd8739ae039 = $061d4b686ac304a4$var$filterSlice.reducer;


const $7ac9d1b1daf61cd1$var$Filter = ()=>{
    const [isCustomDateEnabled, setIsCustomDateEnabled] = (0, $8OivB$react.useState)(false);
    let currentFilterState = (0, $8OivB$reactredux.useSelector)((store)=>store.filter);
    const dispatch = (0, $8OivB$reactredux.useDispatch)();
    const dispatchAction = ()=>{
        const toDate = document.getElementById("datetime-local-to").value;
        const fromDate = document.getElementById("datetime-local-from").value;
        if (new Date(fromDate) > new Date(toDate)) {
            alert("From Date should start before To Date");
            return;
        }
        if (fromDate && toDate) dispatch((0, $061d4b686ac304a4$export$347972a19297a2b7)({
            type: "customDate",
            fromDate: fromDate,
            toDate: toDate
        }));
        else alert("either from or to date is not selected");
    };
    const handleDropDownChange = (event)=>{
        if (isCustomDateEnabled) setIsCustomDateEnabled(!isCustomDateEnabled);
        const selection = event.target.value;
        let selectionStringToDispatch = "";
        switch(selection){
            case "currentMonth":
                selectionStringToDispatch = "currentMonth";
                break;
            case "previousMonth":
                selectionStringToDispatch = "previousMonth";
                break;
            case "lastThreeMonths":
                selectionStringToDispatch = "lastThreeMonths";
                break;
            default:
                selectionStringToDispatch = "";
                setIsCustomDateEnabled(!isCustomDateEnabled);
                break;
        }
        if (selectionStringToDispatch) dispatch((0, $061d4b686ac304a4$export$347972a19297a2b7)({
            type: selection
        }));
    };
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        className: "p-2",
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("select", {
                    onChange: handleDropDownChange,
                    defaultValue: currentFilterState.filterApplied || "Select",
                    children: [
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "currentMonth",
                            children: "This Month"
                        }),
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "previousMonth",
                            children: "Previous Month"
                        }),
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "lastThreeMonths",
                            children: "Last 3 Months"
                        }),
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "customDate",
                            children: "Custom Range"
                        })
                    ]
                })
            }),
            isCustomDateEnabled && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                className: "flex flex-row",
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("input", {
                        type: "date",
                        id: "datetime-local-from",
                        className: "mx-2 border-solid"
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("input", {
                        type: "date",
                        id: "datetime-local-to",
                        className: "mx-2 border-solid"
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("button", {
                        onClick: dispatchAction,
                        className: "bg-blue-500 rounded-md text-white text-center p-1 pr-4 pl-4 mx-2",
                        children: " View "
                    })
                ]
            })
        ]
    });
};
var $7ac9d1b1daf61cd1$export$2e2bcd8739ae039 = $7ac9d1b1daf61cd1$var$Filter;




const $8d05e17b761241fb$var$getFilterValues = function getFilterValues(currentFilterState) {
    let fromDate = null;
    let toDate = null;
    if (currentFilterState.filterApplied === "currentMonth") {
        const currentDate = new Date();
        fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        toDate = new Date();
    } else if (currentFilterState.filterApplied === "previousMonth") {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        fromDate = new Date(currentYear, currentMonth - 1, 1);
        toDate = new Date(currentYear, currentMonth, 0);
    } else if (currentFilterState.filterApplied === "lastThreeMonths") {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        fromDate = new Date(currentYear, currentMonth - 3, 1);
        toDate = new Date(currentYear, currentMonth, 0);
    } else {
        fromDate = new Date(currentFilterState.fromDate);
        toDate = new Date(currentFilterState.toDate);
    }
    return {
        fromDate: fromDate,
        toDate: toDate
    };
};
const $8d05e17b761241fb$var$sortList = function sortList(selection, listToSort) {
    console.log(listToSort);
    let sortedList = [];
    if (selection === "costLowToHigh") sortedList = listToSort.sort((a, b)=>a.transactionAmount - b.transactionAmount);
    else if (selection === "costHighToLow") sortedList = listToSort.sort((a, b)=>b.transactionAmount - a.transactionAmount);
    else if (selection === "untagged") {
        console.log("untagged");
        sortedList = listToSort.sort((a, b)=>a.hasOwnProperty("transactionTag") ? -1 : b.hasOwnProperty("transactionTag") ? 1 : 0);
    }
    return sortedList;
};
const $8d05e17b761241fb$var$filterForMonths = function filterForDates(transactionData, fromDate, toDate) {
    function isDateBetween(dateToCheck, startDate, endDate) {
        return dateToCheck >= startDate && dateToCheck <= endDate;
    }
    const dateToCheck = new Date(transactionData.transactionDate);
    return isDateBetween(dateToCheck, fromDate, toDate);
};
const $8d05e17b761241fb$var$useFilterTransactions = ()=>{
    let transactionListFromRedux = (0, $8OivB$reactredux.useSelector)((store)=>store.transactions.transactionData);
    let currentFilterState = (0, $8OivB$reactredux.useSelector)((store)=>store.filter);
    const [list, setList] = (0, $8OivB$react.useState)([]);
    const [selection, setSelection] = (0, $8OivB$react.useState)("costHighToLow");
    const handleDropDownChange = (event)=>{
        const selection = event.target.value;
        setSelection(selection);
    };
    const { fromDate: fromDate, toDate: toDate } = (0, $8OivB$react.useMemo)(()=>{
        return $8d05e17b761241fb$var$getFilterValues(currentFilterState);
    }, [
        currentFilterState
    ]);
    (0, $8OivB$react.useEffect)(()=>{
        const filteredList = transactionListFromRedux.filter((transaction)=>$8d05e17b761241fb$var$filterForMonths(transaction, fromDate, toDate));
        if (selection) {
            const sortedList = $8d05e17b761241fb$var$sortList(selection, filteredList);
            setList([
                ...sortedList
            ]);
        } else setList([
            ...filteredList
        ]);
    }, [
        currentFilterState,
        transactionListFromRedux
    ]);
    (0, $8OivB$react.useEffect)(()=>{
        if (list.length > 0) {
            const sortedList = $8d05e17b761241fb$var$sortList(selection, list);
            setList([
                ...sortedList
            ]);
        }
    }, [
        selection
    ]);
    return {
        list: list,
        handleDropDownChange: handleDropDownChange
    };
};
var $8d05e17b761241fb$export$2e2bcd8739ae039 = $8d05e17b761241fb$var$useFilterTransactions;









const $110c6f806e5bc504$var$ViewTransactionRow = ({ recipientName: recipientName, transactionCount: transactionCount, totalTransactionAmount: totalTransactionAmount, transactionType: transactionType, iconComponent: iconComponent })=>{
    const [openModal, setIsOpenModal] = (0, $8OivB$react.useState)(false);
    const [categoryAssigned, isCategoryAssigned] = (0, $8OivB$react.useState)(false);
    const toggleModal = ()=>{
        setIsOpenModal(!openModal);
    };
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        className: `flex flex-row justify-between items-center py-3 px-3 bg-[#fff]`,
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                className: "transaction-info",
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                        className: "capitalize flex",
                        children: [
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                                className: "mr-2",
                                children: [
                                    recipientName,
                                    " "
                                ]
                            }),
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                                className: "text-xs",
                                children: [
                                    " ",
                                    categoryAssigned && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsfa.FaCheckDouble), {}),
                                    " "
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                                className: "text-sm capitalize  text-[#818181] text-wrap",
                                children: [
                                    " ",
                                    transactionCount,
                                    " Transactions - "
                                ]
                            }),
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                                className: "text-sm capitalize  text-[#818181] text-wrap",
                                children: [
                                    " \u20B9 ",
                                    totalTransactionAmount,
                                    " ",
                                    transactionType === "PAID" ? "spent" : "credited"
                                ]
                            })
                        ]
                    })
                ]
            }),
            recipientName !== "Transfer From Account" && recipientName !== "Credited To Account" && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("button", {
                className: "category bg-[#f2f2f2] p-2 h-10 rounded-md text-sm flex items-center",
                onClick: toggleModal,
                children: "Assign category to all"
            }),
            openModal && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $ddea889417ffec32$export$2e2bcd8739ae039), {
                toggleModal: toggleModal,
                isModalOpen: openModal,
                transactionId: "",
                recipientName: recipientName,
                isCategoryAssigned: isCategoryAssigned
            })
        ]
    }, recipientName);
};
var $110c6f806e5bc504$export$2e2bcd8739ae039 = $110c6f806e5bc504$var$ViewTransactionRow;



const $9ab32e2421b5a7c3$var$useGroupTransactionsByName = function groupTransactionsByName(list, numberOfResults, filterON) {
    function TransactionObject(recipientName, totalTransactionAmount, transactionType, iconComponent) {
        this.recipientName = recipientName;
        this.totalTransactionAmount = totalTransactionAmount;
        this.transactionCount = 1;
        this.transactionType = transactionType;
        this.iconComponent = iconComponent;
    }
    if (list && list.length === 0) return [];
    const map = new Map();
    const updateObject = function(amountObject, transactionAmount) {
        amountObject.totalTransactionAmount += transactionAmount;
        amountObject.transactionCount += 1;
        return amountObject;
    };
    list.forEach((element)=>{
        const recipientName = element.recipient;
        const transactionAmount = element.transactionAmount;
        const transactionType = element.transactionType;
        const transactionTag = element.transactionTag;
        let iconComponent = null;
        if (transactionTag) {
            const categoryObject = (0, $0962f540de4767ed$export$2e2bcd8739ae039).filter((category)=>category.name === transactionTag.category.toString())[0];
            let componentObject = categoryObject.subcategories.filter((subcategory)=>subcategory.displayName === transactionTag.subCategory)[0];
            componentObject = {
                ...componentObject,
                category: categoryObject.name
            };
            iconComponent = componentObject;
        }
        if (map.has(element.recipient)) {
            const amountObject = map.get(recipientName);
            map.set(recipientName, updateObject(amountObject, transactionAmount));
        } else {
            const amountObject = new TransactionObject(recipientName, transactionAmount, transactionType, iconComponent);
            map.set(recipientName, amountObject);
        }
    });
    let sortedArray = Array.from(map);
    if (filterON === "frequency") sortedArray.sort((a, b)=>b[1].transactionCount - a[1].transactionCount);
    else if (filterON === "value") sortedArray.sort((a, b)=>b[1].totalTransactionAmount - a[1].totalTransactionAmount);
    sortedArray = sortedArray.filter((item, index)=>index < numberOfResults);
    return sortedArray;
};
var $9ab32e2421b5a7c3$export$2e2bcd8739ae039 = $9ab32e2421b5a7c3$var$useGroupTransactionsByName;


const $6fd78f17b7d81080$var$ViewTransactions = ({ transactionList: transactionList, sortType: sortType, title: title })=>{
    const [accordionState, setAccordionState] = (0, $8OivB$react.useState)(true);
    const [numberOfResults, setNumberOfResults] = (0, $8OivB$react.useState)(5);
    const list = (0, $9ab32e2421b5a7c3$export$2e2bcd8739ae039)(transactionList, numberOfResults, sortType);
    const handleClick = function handleClick() {
        setAccordionState(!accordionState);
    };
    const handleDropDownChange = function(event) {
        event.stopPropagation();
        let selection = parseInt(event.target.value);
        setNumberOfResults(selection);
    };
    if (list.length === 0) return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {});
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        className: `most-frequent-wrapper m-3 rounded-lg shadow-md`,
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                onClick: handleClick,
                className: `flex cursor-pointer p-2 items-center justify-between hover:bg-[#f2f2f2]  ${accordionState ? "bg-[#f2f2f2] rounded-t-lg" : "bg-[#fff] rounded-lg"}`,
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("h1", {
                        className: "font-semibold text-lg py-2",
                        children: [
                            " ",
                            title
                        ]
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("span", {
                        className: "py-2",
                        children: [
                            " ",
                            accordionState ? /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsio.IoIosArrowUp), {}) : /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reacticonsio.IoIosArrowDown), {})
                        ]
                    })
                ]
            }),
            accordionState && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                className: "bg-[#fff] px-2 py-2",
                children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("select", {
                    onChange: handleDropDownChange,
                    className: "h-8 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "5",
                            children: "Top 5"
                        }),
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "10",
                            children: "Top 10"
                        }),
                        /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                            value: "15",
                            children: "Top 15"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                className: `row-wrapper rounded-b-lg ${accordionState ? "pb-1" : "pb-0"}`,
                children: accordionState && list.map((groupedTransaction)=>{
                    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $110c6f806e5bc504$export$2e2bcd8739ae039), {
                        recipientName: groupedTransaction[1].recipientName,
                        transactionCount: groupedTransaction[1].transactionCount,
                        totalTransactionAmount: groupedTransaction[1].totalTransactionAmount,
                        transactionType: groupedTransaction[1].transactionType,
                        iconComponent: groupedTransaction[1].iconComponent
                    }, groupedTransaction[1].recipientName);
                })
            })
        ]
    });
};
var $6fd78f17b7d81080$export$2e2bcd8739ae039 = $6fd78f17b7d81080$var$ViewTransactions;


const $5e28fb69e9789953$var$Viewer = ()=>{
    let { list: transactionList, handleDropDownChange: handleDropDownChange } = (0, $8d05e17b761241fb$export$2e2bcd8739ae039)();
    const navigate = (0, $8OivB$reactrouterdom.useNavigate)();
    const handleClick = ()=>{
        navigate("/chart", {
            state: {
                transactionList: transactionList
            }
        });
    };
    if (!transactionList) return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
        children: "No Transactions to display"
    });
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $7ac9d1b1daf61cd1$export$2e2bcd8739ae039), {})
            }),
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                className: "flex h-[90vh] justify-center items-center border-4 my-auto relative",
                children: [
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                        className: "draggableParent max-w-[50%] flex-grow border-2 overflow-y-scroll h-[100%] bg-slate-50",
                        children: [
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("select", {
                                onChange: handleDropDownChange,
                                className: "h-8",
                                defaultValue: "costHighToLow",
                                children: [
                                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                                        value: "",
                                        children: "Select an option"
                                    }),
                                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                                        value: "costLowToHigh",
                                        children: "Cost Low to High"
                                    }),
                                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                                        value: "costHighToLow",
                                        children: "Cost High to Low"
                                    }),
                                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("option", {
                                        value: "untagged",
                                        children: "Untagged Transactions"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                                className: "flex justify-evenly flex-wrap",
                                children: transactionList.map(({ transactionDate: transactionDate, transactionType: transactionType, recipient: recipient, transactionAmount: transactionAmount, transactionId: transactionId, transactionTag: transactionTag })=>{
                                    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8747685eb783d3d2$export$2e2bcd8739ae039), {
                                        transactionDate: transactionDate,
                                        transactionId: transactionId,
                                        transactionType: transactionType,
                                        transactionAmount: transactionAmount,
                                        recipient: recipient,
                                        transactionTag: transactionTag
                                    }, transactionId);
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
                        className: "droppableParent flex-grow h-[100%] bg-slate-50 overflow-y-scroll",
                        children: [
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $6fd78f17b7d81080$export$2e2bcd8739ae039), {
                                transactionList: transactionList,
                                sortType: "frequency",
                                title: "Top transactions by frequency"
                            }),
                            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $6fd78f17b7d81080$export$2e2bcd8739ae039), {
                                transactionList: transactionList,
                                sortType: "value",
                                title: "Top transactions by value"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                        className: "absolute bottom-[-35px] right-4",
                        children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("button", {
                            onClick: handleClick,
                            className: "z-20 shadow-lg border-solid rounded-full p-2 h-[70px] w-[70px] bg-slate-600 text-[#fff] text-sm",
                            children: " Analyze "
                        })
                    })
                ]
            })
        ]
    });
};
var $5e28fb69e9789953$export$2e2bcd8739ae039 = $5e28fb69e9789953$var$Viewer;









function $a8fbff6d3f2552d8$var$TransactionObject(recipientName, totalTransactionAmount, transactionType, iconComponent) {
    this.recipientName = recipientName;
    this.totalTransactionAmount = totalTransactionAmount;
    this.transactionCount = 1;
    this.transactionType = transactionType;
    this.iconComponent = iconComponent;
}
const $a8fbff6d3f2552d8$var$groupTransactionByCategory = function groupTransactionByCategory(list) {
    if (list && list.length === 0) return [];
    const map = new Map();
    list.forEach((element)=>{
        const recipientName = element.recipient;
        const transactionAmount = element.transactionAmount;
        const transactionType = element.transactionType;
        const transactionTag = element.transactionTag;
        let iconComponent = null;
        if (transactionTag) {
            const categoryObject = (0, $0962f540de4767ed$export$2e2bcd8739ae039).filter((category)=>category.name === transactionTag.category.toString())[0];
            let componentObject = categoryObject.subcategories.filter((subcategory)=>subcategory.displayName === transactionTag.subCategory)[0];
            componentObject = {
                ...componentObject,
                category: categoryObject.name
            };
            iconComponent = componentObject;
            const amountObject = new $a8fbff6d3f2552d8$var$TransactionObject(recipientName, transactionAmount, transactionType, iconComponent);
            if (map.has(categoryObject.name)) {
                const amountObjectArr = map.get(categoryObject.name);
                map.set(categoryObject.name, [
                    ...amountObjectArr,
                    amountObject
                ]);
            } else map.set(categoryObject.name, [
                amountObject
            ]);
        }
        console.log(map);
    });
    return Array.from(map);
};
const $a8fbff6d3f2552d8$var$useGroupTransactions = function groupTransactionsByName(list) {
    if (list && list.length === 0) return [];
    const map = new Map();
    const updateObject = function(amountObject, transactionAmount) {
        amountObject.totalTransactionAmount += transactionAmount;
        amountObject.transactionCount += 1;
        return amountObject;
    };
    var element;
    return $a8fbff6d3f2552d8$var$groupTransactionByCategory(list);
};
var $a8fbff6d3f2552d8$export$2e2bcd8739ae039 = $a8fbff6d3f2552d8$var$useGroupTransactions;


(0, $8OivB$chartjs.Chart).register((0, $8OivB$chartjs.ArcElement), (0, $8OivB$chartjs.Tooltip), (0, $8OivB$chartjs.Legend));
const $00e939d26bf8a448$var$randomColourGenerator = ()=>{
    return `rgba(${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)}, ${Math.round(Math.random() * 256)})`;
};
const $00e939d26bf8a448$var$rand = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "bottom"
        }
    }
};
const $00e939d26bf8a448$var$printDatasetAtEvent = (dataset, parentData)=>{
    if (!dataset.length) return;
    const datasetIndex = dataset[0].datasetIndex;
    console.log(parentData.datasets[datasetIndex].label);
};
const $00e939d26bf8a448$var$printElementAtEvent = (element, parentData)=>{
    if (!element.length) return;
    const { datasetIndex: datasetIndex, index: index } = element[0];
    return parentData.labels[index];
};
const $00e939d26bf8a448$var$printElementsAtEvent = (elements)=>{
    if (!elements.length) return;
    console.log(elements.length);
};
const $00e939d26bf8a448$var$getFilteredList = function(list) {
    if (!list) return;
    //return Promise.resolve(list.filter(transaction => transaction[1].transactionType !== 'RECIEVED' ));
    return list.filter((transaction)=>transaction[1].transactionType !== "RECIEVED");
};
const $00e939d26bf8a448$var$populateMapForParentCategories = (list)=>{
    if (!list) return;
    console.log(list);
    const map = new Map();
    list.forEach(function(transactionObject) {
        console.log(transactionObject);
        let categoryName = transactionObject[1].iconComponent ? transactionObject[1].iconComponent.category : null;
        if (!categoryName) categoryName = "Others";
        if (map.has(categoryName)) map.set(categoryName, map.get(categoryName) + parseFloat(transactionObject[1].totalTransactionAmount));
        else map.set(categoryName, parseFloat(transactionObject[1].totalTransactionAmount));
    });
    return map;
};
const $00e939d26bf8a448$var$populateMapForParentCategoriesV2 = (list)=>{
    if (!list) return;
    console.log(list);
    const map = new Map();
    list.forEach(function(transactionObject) {
        const categoryName = transactionObject[0];
        const transactionsArray = transactionObject[1];
        if (!categoryName) categoryName = "Others";
        const amount = transactionsArray.reduce((acc, transaction)=>acc + transaction.totalTransactionAmount, 0);
        map.set(categoryName, amount);
    });
    return map;
};
const $00e939d26bf8a448$var$getChartDataFromMap = (map)=>{
    const labels = [];
    const totalAmounts = [];
    const backgroundColor = [];
    map.forEach((value, key)=>{
        labels.push(key);
        totalAmounts.push(value);
        backgroundColor.push($00e939d26bf8a448$var$randomColourGenerator());
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Amount Spent",
                data: totalAmounts,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }
        ]
    };
    return data;
};
const $00e939d26bf8a448$var$getChildData = (list, category)=>{
    const labels = [];
    const amount = [];
    const backgroundColor = [];
    console.log(list);
    list.forEach(function(transactionObject) {
        if (transactionObject[1].iconComponent && transactionObject[1].iconComponent.category === category) {
            amount.push(transactionObject[1].totalTransactionAmount);
            labels.push(transactionObject[1].recipientName);
            backgroundColor.push($00e939d26bf8a448$var$randomColourGenerator());
        }
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Amount Spent",
                data: amount,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }
        ]
    };
    return data;
};
const $00e939d26bf8a448$var$getChildDataV2 = (list, category)=>{
    const labels = [];
    const amount = [];
    const backgroundColor = [];
    const map = new Map();
    const transactionObject = list.filter((transaction)=>transaction[0] === category);
    const transactionsArray = transactionObject[0][1];
    transactionsArray.forEach(function(transaction) {
        if (map.has(transaction.recipientName)) map.set(transaction.recipientName, map.get(transaction.recipientName) + parseFloat(transaction.totalTransactionAmount));
        else map.set(transaction.recipientName, transaction.totalTransactionAmount);
    });
    map.forEach((value, key)=>{
        labels.push(key);
        amount.push(value);
        backgroundColor.push($00e939d26bf8a448$var$randomColourGenerator());
    });
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Amount Spent",
                data: amount,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: 1
            }
        ]
    };
    return data;
};
const $00e939d26bf8a448$var$ViewChart = ()=>{
    const [showSubCategoryData, setShowSubCategoryData] = (0, $8OivB$react.useState)(false);
    let [parentData, setParentData] = (0, $8OivB$react.useState)({});
    let [childData, setChildData] = (0, $8OivB$react.useState)({});
    const chartRef = (0, $8OivB$react.useRef)(null);
    const location = (0, $8OivB$reactrouterdom.useLocation)();
    const transactionList = location.state.transactionList;
    const groupedList = (0, $a8fbff6d3f2552d8$export$2e2bcd8739ae039)(transactionList);
    const handleCategoryClick = (event)=>{
        console.log(event);
        const { current: chart } = chartRef;
        console.log(chart);
        if (!chart) return;
        $00e939d26bf8a448$var$printDatasetAtEvent((0, $8OivB$reactchartjs2.getDatasetAtEvent)(chart, event), parentData);
        const categoryClicked = $00e939d26bf8a448$var$printElementAtEvent((0, $8OivB$reactchartjs2.getElementAtEvent)(chart, event), parentData);
        $00e939d26bf8a448$var$printElementsAtEvent((0, $8OivB$reactchartjs2.getElementsAtEvent)(chart, event), parentData);
        const _childData = $00e939d26bf8a448$var$getChildDataV2(groupedList, categoryClicked);
        setChildData({
            ..._childData
        });
        setShowSubCategoryData(true);
    };
    (0, $8OivB$react.useEffect)(()=>{
        const filteredList = $00e939d26bf8a448$var$getFilteredList(groupedList);
        //const map = populateMapForParentCategories(filteredList);
        const map = $00e939d26bf8a448$var$populateMapForParentCategoriesV2(filteredList);
        const parentData = $00e939d26bf8a448$var$getChartDataFromMap(map);
        setParentData(parentData);
    }, []);
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsxs)("div", {
        className: "flex justify-center items-center h-[100vh]",
        children: [
            /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                className: "flex flex-col",
                children: Object.keys(parentData).length > 0 && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                    children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reactchartjs2.Doughnut), {
                        ref: chartRef,
                        data: parentData,
                        onClick: handleCategoryClick,
                        options: $00e939d26bf8a448$var$rand
                    })
                })
            }),
            showSubCategoryData && /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
                className: "flex flex-col",
                children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reactchartjs2.Doughnut), {
                    data: childData,
                    options: $00e939d26bf8a448$var$rand
                })
            })
        ]
    });
};
var $00e939d26bf8a448$export$2e2bcd8739ae039 = $00e939d26bf8a448$var$ViewChart;






const $3f2836a7c945d72e$var$appStore = (0, $8OivB$reduxjstoolkit.configureStore)({
    reducer: {
        filter: (0, $061d4b686ac304a4$export$2e2bcd8739ae039),
        transactions: (0, $97ce3d639f0037f7$export$2e2bcd8739ae039)
    }
});
var $3f2836a7c945d72e$export$2e2bcd8739ae039 = $3f2836a7c945d72e$var$appStore;



const $a826c173f4456cde$var$root = (0, ($parcel$interopDefault($8OivB$reactdomclient))).createRoot(document.getElementById("root"));
const $a826c173f4456cde$var$Root = ()=>{
    return /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reactredux.Provider), {
        store: (0, $3f2836a7c945d72e$export$2e2bcd8739ae039),
        children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)("div", {
            id: "app",
            children: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reactrouterdom.Outlet), {})
        })
    });
};
const $a826c173f4456cde$var$appRouter = (0, $8OivB$reactrouterdom.createBrowserRouter)([
    {
        path: "/",
        element: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)($a826c173f4456cde$var$Root, {}),
        children: [
            {
                path: "/",
                element: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $12cdbc2a42be128f$export$2e2bcd8739ae039), {})
            },
            {
                path: "/transactions",
                element: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $5e28fb69e9789953$export$2e2bcd8739ae039), {})
            },
            {
                path: "/chart",
                element: /*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $00e939d26bf8a448$export$2e2bcd8739ae039), {})
            }
        ]
    }
]);
$a826c173f4456cde$var$root.render(/*#__PURE__*/ (0, $8OivB$reactjsxruntime.jsx)((0, $8OivB$reactrouterdom.RouterProvider), {
    router: $a826c173f4456cde$var$appRouter
}));


//# sourceMappingURL=app.js.map
