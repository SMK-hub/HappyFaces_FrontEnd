/* eslint-disable no-unused-vars */
// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilHome,
  UilCalendarAlt,
  UilCreditCard,
  UilSetting,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
// import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import axios from "axios";
import { API_BASE_URL } from "../../../config";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilChart,
    heading: "Dashboard",
    path: "Dashboard",
  },
  {
    icon: UilHome,
    heading: "Orphanages",
    path: "Orphanages",
  },
  {
    icon: UilUsersAlt,
    heading: "Donors",
    path: "Donors",
  },
  {
    icon: UilCalendarAlt,
    heading: 'Events',
    path: 'Events',
  },
  {
    icon: UilCreditCard,
    heading: 'Payments',
    path:'Payments',
  },
  {
    icon: UilSetting,
    heading: 'Settings',
    path:'Settings',
  }
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Orphanages",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 50,
    value: "59",
    png: UilHome,
    series: [
      {
        name: "Orphanage",
        data: [11, 22, 28, 51, 42, 47, 59],
      },
    ],
  },
  {
    title: "Donors",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 23,
    value: "40",
    png: UilUsersAlt,
    series: [
      {
        name: "Donors",
        data: [10, 15, 35, 70, 60, 25, 40],
      },
    ],
  },
  {
    title: "Donations",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 43,
    value: "97",
    png: UilCreditCard,
    series: [
      {
        name: "Donations",
        data: [10, 30, 50, 25, 33, 27, 97],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    // img: img1,
    name: "Mother Theresa",
    noti: "says Small things done with great love will change the world.",
    // time: "25 seconds ago",
  },
  {
    // img: img3,
    name: "Rosa Parks",
    noti: "says that I believe there is only one race - the human race.",
    // time: "2 hours ago",
  },

  {
    name : "Mahatma Gandhi",
    noti: "says You must be the change you wish to see in the world."
  }
];

export const fetchOrphanagesData= async() =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/orphanageList`)
    return response.data;
  }catch(error){
    console.log(error);
  }
} 

export const fetchorphanageDetailById = async(orphanageId) =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/orphanageDetails/${orphanageId}`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const fetchOrphanageDetailsData = async() =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/orphanageDetailsList`)
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const fetchDonorsData = async() =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/donorList`);
    return response.data;
  }catch(error){
    console.log(error);
    return [];
  }
}

export const fetchEventsData = async() =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/eventList`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const fetchDonationsData = async() =>{
  try{
    const response=await axios.get(`${API_BASE_URL}/admin/donationList`);
    return response.data;
  }catch(error){
    console.log(error);
  }
}

export const payData = [
  {
    id: 1,
    name: "Manonmai",
    contact: "6301478132",
    location: "RR Nagar",
    orphanage: "Leo",
    date: "11-01-2024",
    donated: "Money",
  },
  {
    id: 2,
    name: "Srikanth",
    contact: "6301478133",
    location: "Marathalli",
    orphanage: "Kaithi",
    date: "07-05-2023",
    donated: "Food",
  },
  {
    id: 3,
    name: "Siddik",
    contact: "6301478134",
    location: "Tin Factory",
    orphanage: "Vikram",
    date: "20-08-2021",
    donated: "Books",
  },
  {
    id: 4,
    name: "Venu",
    contact: "6301478135",
    location: "Indira Nagar",
    orphanage: "Master",
    date: "11-06-2023",
    donated: "Clothes",
  },
  {
    id: 5,
    name: "Bhargavi",
    contact: "6301478136",
    location: "Church Street",
    orphanage: "Rolex",
    date: "12-01-2022",
    donated: "Money",
  },
];


