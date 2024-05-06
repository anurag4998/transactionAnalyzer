import { BiCameraMovie, BiDrink } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { CiPillsBottle1 } from "react-icons/ci";
import { FaBusAlt, FaHouseUser, FaShoppingBag } from "react-icons/fa";
import { FaAmazon, FaBriefcaseMedical, FaBus, FaTaxi, FaTooth, FaTrain, FaTrainSubway,FaSatelliteDish, FaYoutube, FaSpotify, FaApple,FaGoogleScholar } from "react-icons/fa6";
import { GiClothes, GiConverseShoe, GiFrenchFries, GiGymBag, GiHouse, GiHypodermicTest, GiLipstick, GiMedicines, GiSaloon, GiShuttlecock, GiTennisRacket } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { IoAirplane, IoFastFood } from "react-icons/io5";
import { LuCakeSlice, LuCircleDashed } from "react-icons/lu";
import { MdBrunchDining, MdElectricBolt, MdLaptop, MdLocalGroceryStore, MdOutlineChair, MdOutlineSportsTennis, MdWaterDrop } from "react-icons/md";
import { PiBooks } from "react-icons/pi";
import { RiEBikeLine, RiNetflixFill } from "react-icons/ri";
import { SiFlipkart, SiSwiggy, SiUber, SiZomato,SiPrimevideo,SiGooglescholar  } from "react-icons/si";
import { LuMic2 } from "react-icons/lu";
import { TbBrandBumble,TbBrandDisney } from "react-icons/tb";


const categoryCatalog = [
    {
        name : 'Food & Drinks',
        defaultIcon : <IoFastFood />,
        defaultComponent : {iconComponent : null, displayName : 'Food & Drinks'},
        subcategories : [
            {iconComponent : <SiSwiggy/>, displayName: 'Swiggy'}, 
            {iconComponent : <SiZomato/>, displayName: 'Zomato'}, 
            {iconComponent : <MdBrunchDining/> ,displayName : 'Eating Out'},
            {iconComponent : <LuCakeSlice/>, displayName : 'Desserts'},
            {iconComponent : <BiDrink />, displayName : 'Drinks'},
            {iconComponent : <GiFrenchFries/> , displayName : 'Snacks'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ]
    },
    {   
        name : 'Shopping',
        defaultIcon : <FaShoppingBag/>,
        defaultComponent : {iconComponent : null, displayName : 'Shopping'},
        subcategories : [
            {iconComponent: <MdLocalGroceryStore /> , displayName: 'Grocery'} , 
            {iconComponent: <GiClothes /> , displayName: 'Clothes'} , 
            {iconComponent: <FaAmazon /> , displayName: 'Amazon'} , 
            {iconComponent: <SiFlipkart /> , displayName: 'Flipkart'} , 
            {iconComponent: <GiConverseShoe /> , displayName: 'Shoes'} , 
            {iconComponent: <MdLaptop /> , displayName: 'Electronics'} , 
            {iconComponent: <PiBooks /> , displayName: 'Books'},
            {iconComponent : <MdOutlineChair/> , displayName : 'Furniture'},
            {iconComponent : <GiLipstick/> , displayName : 'Cosmetics'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}

        ]
    },
    {
        name : 'Entertainment',
        defaultIcon : <FaBusAlt/>,
        defaultComponent : {iconComponent : null, displayName : 'Entertainment'},

        subcategories : [
            {iconComponent: <BiCameraMovie /> , displayName: 'Movies'} , 
            {iconComponent: <LuMic2 /> , displayName: 'Shows'} , 
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ]
    },
    {
        name : 'Transport',
        defaultIcon : <FaBusAlt/>,
        defaultComponent : {iconComponent : null, displayName : 'Transport'},

        subcategories : [
            {iconComponent: <SiUber /> , displayName: 'Uber'} , 
            {iconComponent: <FaTrainSubway /> , displayName: 'Metro/Local'} , 
            {iconComponent: <FaTrain /> , displayName: 'Train'} , 
            {iconComponent: <FaBus /> , displayName: 'Bus'} , 
            {iconComponent: <IoAirplane /> , displayName: 'Airplane'} , 
            {iconComponent: <FaTaxi /> , displayName: 'Taxi'} , 
            {iconComponent: <RiEBikeLine/>, displayName : 'Rapido'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ]
    }, 
    {
        name : 'Bills',
        defaultIcon: <FaHouseUser />,
        defaultComponent : {iconComponent : null, displayName : 'Utilities'},

        subcategories : [
            {iconComponent: <FaSatelliteDish   /> , displayName: 'DTH'} , 
            {iconComponent: <MdElectricBolt/> , displayName: 'Electricity'},
            {iconComponent: <MdWaterDrop /> , displayName: 'Water'},
            {iconComponent : <GiHouse /> , displayName : 'Rent'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ] 
    },
    {
        name : 'Fitness',
        defaultIcon: <FaHouseUser />,
        defaultComponent : {iconComponent : null, displayName : 'Fitness'},

        subcategories : [
            {iconComponent: <IoIosFootball  /> , displayName: 'Football'} , 
            {iconComponent: <GiTennisRacket  /> , displayName: 'Tennis'} , 
            {iconComponent : <GiShuttlecock /> , displayName : 'Badminton'},
            {iconComponent: <CgGym/> , displayName: 'Gym'},
            {iconComponent: <GiGymBag  /> , displayName: 'Equipment'},
            {iconComponent : <CiPillsBottle1 /> , displayName : 'Nutrition'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ] 
    },
    {
        name : 'Medical',
        defaultIcon: <FaHouseUser />,
        defaultComponent : {iconComponent : null, displayName : 'Medical'},

        subcategories : [
            {iconComponent: <FaBriefcaseMedical  /> , displayName: 'Doctor'} , 
            {iconComponent: <GiMedicines   /> , displayName: 'Medicines'} , 
            {iconComponent : <GiHypodermicTest /> , displayName : 'Tests'},
            {iconComponent: <FaTooth/> , displayName: 'Dentist'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ] 
    },
    {
        name : 'Subscription',
        defaultIcon: <FaHouseUser />,
        defaultComponent : {iconComponent : null, displayName : 'Subscription'},

        subcategories : [
            {iconComponent: <RiNetflixFill   /> , displayName: 'Netflix'} , 
            {iconComponent: <SiPrimevideo    /> , displayName: 'Prime'} , 
            {iconComponent : <TbBrandBumble /> , displayName : 'Bumble'},
            {iconComponent: <FaYoutube /> , displayName: 'Youtube'},
            {iconComponent: <FaSpotify  /> , displayName: 'Spotify'},
            {iconComponent: <FaApple  /> , displayName: 'Apple'},
            {iconComponent: <SiGooglescholar  /> , displayName: 'Learning'},
            {iconComponent: <TbBrandDisney  /> , displayName: 'Disney'},
            {iconComponent : <LuCircleDashed/> , displayName : 'No Icon'}
        ] 
    }
]

export default categoryCatalog;