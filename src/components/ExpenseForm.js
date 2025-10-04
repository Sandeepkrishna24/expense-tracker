import React, { useState } from 'react';

function ExpenseForm({ onAdd }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState('Food');

  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted!', { amount, date, note }); // Debug line
    
    if (!amount || !date || !note) {
      console.log('Missing fields!');
      return;
    }
    
onAdd({ amount, date, note, category });

    console.log('Expense added!'); // Debug line
    
    // Clear form
    setAmount('');
    setDate('');
    setNote('');
    setCategory('Food');

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
      <select 
  value={category} 
  onChange={e => setCategory(e.target.value)}
>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Entertainment">Entertainment</option>
  <option value="Utilities">Utilities</option>
  <option value="Others">Others</option>
</select><br/>

      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;
