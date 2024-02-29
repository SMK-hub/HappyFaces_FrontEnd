import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import "./Table.css";

const makeStyle = (status) => {
  if (status === "NOT_VERIFIED") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "red",
    };
  }
};

export default function BasicTable() {
  const [orphanagesData, setOrphanagesData] = useState([]);

  useEffect(() => {
    fetchOrphanages();
  }, []);

  const fetchOrphanages = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/admin/orphanageDetailsList`
      );
      const data = response.data
        .filter((orphanage) => orphanage.verificationStatus !== "VERIFIED")
        .map((orphanage) => ({
          ...orphanage,
          name: orphanage.orphanageName,
          location: orphanage.address.city,
          contact: orphanage.contact,
          status: orphanage.verificationStatus,
        }));
      console.log(data);
      setOrphanagesData(data.slice(0, 5));
    } catch (error) {
      console.error("Error fetching orphanages", error);
    }
  };

  return (
    <div className="OrphTable" style={{width:'130%' ,maxHeight: '200px', overflowY: 'auto'}}>
      <h3><center>Unapproved Orphanages</center></h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
  <thead>
    <tr>
      <th>Name</th>
      <th>Location</th>
      <th>Contact</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody style={{ maxHeight: "200px", overflowY: "auto" }}>
    {orphanagesData.length > 0 ? (
      orphanagesData.map((orphanage, index) => (
        <tr key={index}>
          <td>{orphanage.name}</td>
          <td>{orphanage.location}</td>
          <td>{orphanage.contact}</td>
          <td>
            <span className="Orphstatus">{orphanage.status}</span>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="4" style={{ textAlign: "center" }}>
          All orphanages are verified
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  );
}
