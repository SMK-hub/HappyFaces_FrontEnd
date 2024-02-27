import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
} from "@iconscout/react-unicons";

import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
//import { keyboard } from "@testing-library/user-event/dist/keyboard";

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
    heading: "Orphanage Details",
    link:'/donor-dashboard/orphanageDetails',
    value:'orph'
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


