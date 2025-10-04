import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !note) return;
    onAdd({ amount, date, note });
    setAmount('');
    setDate('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        required
      /><br/>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      /><br/>
      <input
        type="text"
        placeholder="Note"
        value={note}
        onChange={e => setNote(e.target.value)}
        required
      /><br/>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
