// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    link:'/orphanage-dashboard',
    value:'home'
  },
  {
    icon: UilClipboardAlt,
    heading: "Details",
    link:'/OrphanageHome/details',
    value:'container'
  },
  {
    icon: UilPackage,
    heading: 'Profile',
    link:'/OrphanageHome/profile',
    value:'profile'
  },
  {
    icon: UilUsersAlt,
    heading: "Events",
    link:'/OrphanageHome/events',
    value:'events'
  },
  {
    icon: UilChart,
    heading: 'Payments',
    link:'/OrphanageHome/payments',
    value:'payments'
  }
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Details",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25",
    png: UilUsdSquare,
    series: [
      {
        name: "Details",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Profile",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "4",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Profile",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Events",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "2",
    png: UilClipboardAlt,
    series: [
      {
        name: "Events",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Amisha Raj ",
    noti: "has participated in event organised by xyz orphanage.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Selva Muthu Kannan",
    noti: "has donated 50,000 rupees",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Manonmai",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];
