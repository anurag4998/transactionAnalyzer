import React from "react";
import { SiSwiggy,SiZomato,SiFlipkart,SiUber } from "react-icons/si";
import { MdBrunchDining,MdLocalGroceryStore,MdOutlineSportsTennis,MdLaptop   } from "react-icons/md";
import { FaTrainSubway,FaTrain,FaBus,FaTaxi,FaAmazon} from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { BiCameraMovie } from "react-icons/bi";
import { LuCakeSlice } from "react-icons/lu";
import { GiConverseShoe } from "react-icons/gi";


const categoryCatalog = [
   {
        Food : [<SiSwiggy/>, <SiZomato/>, <MdBrunchDining/> , <LuCakeSlice/>],
        Shopping : [<MdLocalGroceryStore />, <GiClothes />, <FaAmazon />,<SiFlipkart />,<GiConverseShoe />,<MdLaptop />],
        Entertainment : [<BiCameraMovie />, <MdOutlineSportsTennis />],
        Transport : [<SiUber />, <FaTrainSubway />, <FaTrain />,<FaBus />,<IoAirplane />, <FaTaxi />],

   }
]

const Category = () => {
    return (
        <div className="category-holder">
            

        </div>
    )
}