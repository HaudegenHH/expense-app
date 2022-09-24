import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import dayjs from 'dayjs';

export default function TransactionList({
  transactions,
  fetchTransactions,
  setEditTransaction,
}) {
  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?'))
      return;

    const res = await fetch(
      `${process.env.REACT_APP_API_URI}/transactions/${id}`,
      {
        method: 'DELETE',
      }
    );
    if (res.ok) {
      window.alert('deleted successfully');
      fetchTransactions();
    }
  };

  const formatDate = (date) => {
    return dayjs(date).format('DD. MMM. YYYY');
  };

  return (
    <>
      <Typography sx={{ marginTop: 10 }} variant="h6">
        List of Transactions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {transaction.amount}
                </TableCell>
                <TableCell align="center">{transaction.description}</TableCell>
                <TableCell align="center">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component="label"
                    onClick={() => setEditTransaction(transaction)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="warning"
                    component="label"
                    onClick={() => remove(transaction._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
