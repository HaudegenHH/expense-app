import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Cookies from 'js-cookie';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  async function fetchTransactions() {
    const token = Cookies.get('token');
    const res = await fetch(`${process.env.REACT_APP_API_URI}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = await res.json();
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Container>
      <TransactionForm
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
        setEditTransaction={setEditTransaction}
      />
      <TransactionList
        fetchTransactions={fetchTransactions}
        transactions={transactions}
        setEditTransaction={setEditTransaction}
      />
    </Container>
  );
}
