import React, { createContext, useState, useContext, useEffect } from "react";
 
const UserContext = createContext();
 
export const useUser = () => {
    const { userDetails, setUserData } = useContext(UserContext);
    useEffect(() => {
      const storedUserDetails = localStorage.getItem('userDetails');
      if (!userDetails && storedUserDetails) {
        setUserData(JSON.parse(storedUserDetails));
      }
    }, [userDetails, setUserData]);
   
    return { userDetails, setUserData };
  };

export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });
 
  const setUserData = (user) => {
    setUserDetails(user);
    localStorage.setItem('userDetails', JSON.stringify(user));
  };
 
  return (
    <UserContext.Provider value={{ userDetails, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
 
