import React, { useState } from "react";
import "./Details.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Sidebar from "../Sidebar";
import RightSide from "../RigtSide/RightSide";

// parent Card

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      )}
    </AnimateSharedLayout>
  );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
  const Png = param.png;

  return (
    <div>
      <Sidebar/>
    {/* <motion.div
      className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
      onClick={setExpanded}
    > */}
      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>{param.value}</span>
        <span>Last 24 hours</span>
      </div>
      
    {/* </motion.div> */}<RightSide/>
    </div>
  );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
  return (
    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow,
      }}
      layoutId="expandableCard"
    >
      <div
        style={{
          alignSelf: "flex-end",
          cursor: "pointer",
          color: "white",
        }}
      >
        <UilTimes onClick={setExpanded} />
      </div>
      <div className="basicDetails">
        <div>
          <img
              src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" 
            style={{
              width: "100px",   
              height: "100px",  
              borderRadius: "50%",
            }}
          />
        </div>
        <div className="details">
        <div>Name: Amisha Raj {param.name}</div>
        <div>Age: 23 {param.age}</div>
        <div>Email: amisha_raj@thbs.com{param.email}</div>
        <div>Phone: 1234566799 {param.phone}</div>
        </div>
        </div>
        <div className="buttons">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => console.log("Update Password")}>
            Update Password
          </Button>
          <Button onClick={() => console.log("Update Profile")}>
            Update Profile
          </Button>
          </ButtonGroup>

        </div>
      
      
    </motion.div>
  );
}

export default Card;
