import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  async function fetchTransactions() {
    const response = await fetch('http://localhost:5000/transactions');
    const { data } = await response.json();
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
