import React from "react";
import { SiSwiggy,SiZomato,SiFlipkart,SiUber } from "react-icons/si";
import { MdBrunchDining,MdLocalGroceryStore,MdOutlineSportsTennis,MdLaptop,MdElectricBolt,MdWaterDrop    } from "react-icons/md";
import { FaTrainSubway,FaTrain,FaBus,FaTaxi,FaAmazon,FaBriefcaseMedical } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { BiCameraMovie,BiDrink  } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";
import { GiConverseShoe, GiSaloon } from "react-icons/gi";


const categoryCatalog = [
   {
        Food : [
            {component : <SiSwiggy/>, displayName: 'Swiggy'}, 
            {component : <SiZomato/>, displayName: 'Zomato'}, 
            {component : <MdBrunchDining/> ,displayName : 'Eating Out'},
            {component : <LuCakeSlice/>, displayName : 'Desserts'},
            {component : <BiDrink />, displayName : 'Desserts'}
        ],
        Shopping : [
            {component: <MdLocalGroceryStore /> , displayName: 'Grocery'} , 
            {component: <GiClothes /> , displayName: 'Clothes'} , 
            {component: <FaAmazon /> , displayName: 'Amazon'} , 
            {component: <SiFlipkart /> , displayName: 'Flipkart'} , 
            {component: <GiConverseShoe /> , displayName: 'Shoes'} , 
            {component: <MdLaptop /> , displayName: 'Electronics'} , 
        ],
        Entertainment : [
            {component: <BiCameraMovie /> , displayName: 'Movies'} , 
            {component: <MdOutlineSportsTennis /> , displayName: 'Sports'} , 
        ],
        Transport : [
            {component: <SiUber /> , displayName: 'Uber'} , 
            {component: <FaTrainSubway /> , displayName: 'Metro/Local'} , 
            {component: <FaTrain /> , displayName: 'Train'} , 
            {component: <FaBus /> , displayName: 'Bus'} , 
            {component: <IoAirplane /> , displayName: 'Airplane'} , 
            {component: <FaTaxi /> , displayName: 'Taxi'} , 
        ],
        Utility : [
            {component: <FaBriefcaseMedical  /> , displayName: 'Doctor'} , 
            {component: <GiSaloon  /> , displayName: 'Saloon'} , 
            {component: <MdElectricBolt/> , displayName: 'Electricity'},
            {component: <MdWaterDrop /> , displayName: 'Water'}
        ] 
   }
]

const Category = () => {
    return (
        <div className="category-holder">
            

        </div>
    )
}