import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

function createData(name, trackingId, date) {
  return { name, trackingId, date };
}

const rows = [
  createData("Tarun", 18908424, "2 January 2024"),
  createData("Sangeeta ", 18908424, "12 January 2024"),
  createData("Ankit", 18908424, "16 January 2024"),
  createData("Anjali", 18908421, "18 January 2024"),
];

const transactions = [
  { orphanageName: "ABC Orphanage", transactionId: 123456, date: "1 February 2024", amount: "$100" },
  { orphanageName: "XYZ Orphanage", transactionId: 789012, date: "2 February 2024", amount: "$150" },
  { orphanageName: "PQR Orphanage", transactionId: 345678, date: "3 February 2024", amount: "$200" },
  { orphanageName: "LMN Orphanage", transactionId: 901234, date: "4 February 2024", amount: "$120" },
];

export default function BasicTable() {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDetailsClick = (index) => {
    setSelectedRow(index);
    // Implement logic to show details for the selected row
    // You can use a modal or any other component to display details
  };

  return (
    
      <div className="LastTransactionsTable">
        <h3>Last 4 Transactions</h3>
        <TableContainer component={Paper}>
          <Table aria-label="last 4 transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Orphanage Name</TableCell>
                <TableCell align="left">Transaction ID</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.orphanageName}</TableCell>
                  <TableCell align="left">{transaction.transactionId}</TableCell>
                  <TableCell align="left">{transaction.date}</TableCell>
                  <TableCell align="left">{transaction.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
