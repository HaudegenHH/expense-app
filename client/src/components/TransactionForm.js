import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import TextField from '@mui/material/TextField';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Button from '@mui/material/Button';

import { useState } from 'react';

const InitialForm = {
  amount: 0,
  description: '',
  date: new Date(),
};

export default function TransactionForm({ fetchTransactions }) {
  const [form, setForm] = useState(InitialForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newValue) => {
    setForm({ ...form, date: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      fetchTransactions();
      setForm(InitialForm);
    }
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add new Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            sx={{ marginRight: 5 }}
            size="small"
            value={form.amount}
            onChange={handleChange}
            name="amount"
          />
          <TextField
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ marginRight: 5 }}
            size="small"
            value={form.description}
            onChange={handleChange}
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="DD.MM.YYYY"
              value={form.date}
              onChange={handleDateChange}
              name="date"
              renderInput={(params) => (
                <TextField {...params} sx={{ marginRight: 5 }} size="small" />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
