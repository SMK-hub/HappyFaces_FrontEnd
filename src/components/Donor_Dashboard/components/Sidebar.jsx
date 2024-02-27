import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {useUser} from '../../../UserContext'



const Sidebar = ({onOptionSelect}) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true)
  const  {setUserData} = useUser();
const SelectOption=(value)=>{

  onOptionSelect(value);
}
  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span style={{display:"flex",flexDirection:'row'}}>
          DO<span>N</span>OR
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)}
            ><div style={{display:'flex',flexDirection:'row',alignItems:'center',gap:'5px'}} onClick={()=>{SelectOption(item.value)}}>
              <item.icon />
              <span>{item.heading}</span>
              </div>
            </div>
            
            
          );
        })}
        {/* signoutIcon */}
        <Link to="/" className="menuItem">
            <UilSignOutAlt />
            <h3 onClick={()=>setUserData("")}>Logout</h3>
          </Link>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
