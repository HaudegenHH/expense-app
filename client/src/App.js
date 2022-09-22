import * as React from 'react';
import { useEffect, useState } from 'react';

import AppBar from './components/AppBar.js';
import TransactionForm from './components/TransactionForm.js';

function App() {
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    const response = await fetch('http://localhost:5000/transactions');
    const { data } = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div>
      <AppBar />
      <TransactionForm fetchTransactions={fetchTransactions} />

      <hr />

      <section>
        <table>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.map((ta) => (
                <tr key={ta._id}>
                  <td>{ta.amount}</td>
                  <td>{ta.description}</td>
                  <td>{ta.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
