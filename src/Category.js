import React, { useEffect } from "react";
// import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { SiSwiggy,SiZomato,SiFlipkart,SiUber } from "react-icons/si";
import { MdBrunchDining,MdLocalGroceryStore,MdOutlineSportsTennis,MdLaptop,MdElectricBolt,MdWaterDrop    } from "react-icons/md";
import { FaTrainSubway,FaTrain,FaBus,FaTaxi,FaAmazon,FaBriefcaseMedical } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { BiCameraMovie,BiDrink  } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";
import { GiConverseShoe, GiSaloon, GiClothes,GiHouse } from "react-icons/gi";
import { RiCloseCircleFill } from "react-icons/ri";
import { updateTransaction } from "./redux/transactionSlice";


const categoryCatalog = [
    {
        name : 'Food & Drinks',
        subcategories : [
            {component : <SiSwiggy/>, displayName: 'Swiggy'}, 
            {component : <SiZomato/>, displayName: 'Zomato'}, 
            {component : <MdBrunchDining/> ,displayName : 'Eating Out'},
            {component : <LuCakeSlice/>, displayName : 'Desserts'},
            {component : <BiDrink />, displayName : 'Drinks'}
        ]
    },
    {   
        name : 'Shopping',
        subcategories : [
            {component: <MdLocalGroceryStore /> , displayName: 'Grocery'} , 
            {component: <GiClothes /> , displayName: 'Clothes'} , 
            {component: <FaAmazon /> , displayName: 'Amazon'} , 
            {component: <SiFlipkart /> , displayName: 'Flipkart'} , 
            {component: <GiConverseShoe /> , displayName: 'Shoes'} , 
            {component: <MdLaptop /> , displayName: 'Electronics'} , 
        ]
    },
    {
        name : 'Entertainment',
        subcategories : [
            {component: <BiCameraMovie /> , displayName: 'Movies'} , 
            {component: <MdOutlineSportsTennis /> , displayName: 'Sports'} , 
        ]
    },
    {
        name : 'Transport',
        subcategories : [
            {component: <SiUber /> , displayName: 'Uber'} , 
            {component: <FaTrainSubway /> , displayName: 'Metro/Local'} , 
            {component: <FaTrain /> , displayName: 'Train'} , 
            {component: <FaBus /> , displayName: 'Bus'} , 
            {component: <IoAirplane /> , displayName: 'Airplane'} , 
            {component: <FaTaxi /> , displayName: 'Taxi'} , 
        ]
    }, 
    {
        name : 'Utilities',
        subcategories : [
            {component: <FaBriefcaseMedical  /> , displayName: 'Doctor'} , 
            {component: <GiSaloon  /> , displayName: 'Saloon'} , 
            {component: <MdElectricBolt/> , displayName: 'Electricity'},
            {component: <MdWaterDrop /> , displayName: 'Water'},
            {component : <GiHouse /> , displayName : 'Rent'}
        ] 
    }]

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding : 'none'
        },
        modalContent: {
            position: 'relative',
            padding: '1rem'
            // overflowY: 'scroll', // Add vertical scrolling
          },        
          closeButton: {
            color: 'black',
            padding: '5px',
            fontSize: '26px',            
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
            position : 'absolute',
            right : 0,
            zIndex : 100
          },
      };

const Category = ({toggleModal, isModalOpen, transactionId}) => {
    const dispatch = useDispatch();
    function closeModal() {
        toggleModal(false);
    }
    const handleSelection = function(transactionTag) {
        console.log(transactionTag)
        dispatch(updateTransaction({transactionId, transactionTag}));
        closeModal();
    }
    return (
        <Modal 
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
            style={customStyles}
            shouldCloseOnEsc={true}
        >
            <button style={customStyles.closeButton} onClick={closeModal}><RiCloseCircleFill/></button>
            <div style={customStyles.modalContent}>
                {categoryCatalog.map (function(category) {
                    const key = category['name'];
                    return(
                        <div className="category-row mb-4">
                            <div className = "heading-wrapper">
                                <h1 className="heading text-[#818181] text-md" >{key}</h1>
                            </div>
                            <div className="flex flex-row">
                                {category['subcategories'].map(function(subcategory) {
                                    return (
                                        <div onClick={() => handleSelection({'category': key, 'subcategory' :subcategory.displayName})} key = {subcategory.displayName} className="flex flex-col justify-evenly mx-2 items-center shadow-lg h-20 w-20 p-2 cursor-pointer">
                                            <div className="text-xl">{subcategory.component} </div>
                                            <div className="text-xs text-[#818181] ">{subcategory.displayName} </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            
        </Modal>
    )
}

export default Category