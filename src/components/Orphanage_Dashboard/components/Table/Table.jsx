import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import { API_BASE_URL } from "../../../../config";
import axios from "axios";
import { useUser } from "../../../../UserContext";

export default function BasicTable() {
  const [transactions, setTransactions] = useState();
  const { userDetails } = useUser();

  useEffect(() => {
    const getDonationData = async () => {
      try {
        const donationResponse = await axios.get(
          `${API_BASE_URL}/orphanage/donation/${userDetails.orpId}`
        );
        const donationData = await Promise.all(
          donationResponse.data.map(async (donation) => {
            const donorData = await axios.get(
              `${API_BASE_URL}/orphanage/donor/${donation.donorId}`
            );
            return {
              ...donation,
              donorData: donorData.data,
            };
          })
        );
        setTransactions(
          donationData
            .sort(
              (a, b) => new Date(a.datetime) - new Date(b.datetime)
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getDonationData();
  }, []);

  return (
    <div className="Table">
      <div className="DonationDetailsTable">
        <h3>Donation Details</h3>
          <Table aria-label="last 4 transactions table">
            <TableHead>
              <TableRow sx={{backgroundColor:'lightpink'}}>
                <TableCell sx={{backgroundColor:'lightpink'}} >Donor Name</TableCell>
                <TableCell sx={{backgroundColor:'lightpink'}} align="left">Transaction ID</TableCell>
                <TableCell sx={{backgroundColor:'lightpink'}} align="left">Date</TableCell>
                <TableCell sx={{backgroundColor:'lightpink'}} align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions?.length > 0 ? (
                transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.donorData.name}</TableCell>
                    <TableCell align="left">{transaction.transactionId}</TableCell>
                    <TableCell align="left">{transaction.dateTime}</TableCell>
                    <TableCell align="left">Rs.{transaction.amount}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Donation Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
      </div>
    </div>
  );
}
