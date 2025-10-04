import './App.css';
import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import * as XLSX from 'xlsx'; // For Excel export

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editExpense, setEditExpense] = useState({ amount: '', date: '', note: '', category: '' });
  const [filterDate, setFilterDate] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const colorMap = {
    Food: '#2cd36b',
    Travel: '#27abf7',
    Entertainment: '#f76707',
    Utilities: '#a88ee6',
    Others: '#865e42'
  };

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map(cat => colorMap[cat] || '#888'),
        borderWidth: 2,
        borderColor: darkMode ? '#232946' : '#fff',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: darkMode ? '#f5f6fa' : '#333',
          padding: 20,
          font: { size: 14 }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ': ₹' + context.raw;
          }
        }
      }
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(expenses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");
    XLSX.writeFile(wb, "ExpenseMate_expenses.xlsx");
  };

  const handleExportCSV = () => {
    const header = "Amount,Date,Note,Category\n";
    const rows = expenses.map(e =>
      [e.amount, e.date, (e.note || "").replace(/,/g, ' '), e.category].join(',')
    );
    const csvContent = header + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "ExpenseMate_expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={`container${darkMode ? ' dark' : ''}`}>
      <button
        className="dark-toggle"
        onClick={() => setDarkMode(dm => !dm)}
      >
        <span className="material-icons">
          {darkMode ? 'light_mode' : 'dark_mode'}
        </span>
        {darkMode ? ' Light Mode' : ' Dark Mode'}
      </button>
      <h1>ExpenseMate</h1>
      <ExpenseForm onAdd={addExpense} />
      <div>
        <h3 className="total-expenses">
          Total Expenses: ₹
          {expenses.reduce((total, exp) => total + parseFloat(exp.amount || 0), 0)}
        </h3>
      </div>
      {expenses.length > 0 && (
        <div className="chart-container">
          <h3>Expense Breakdown by Category</h3>
          <div style={{ maxWidth: 600, margin: '20px auto' }}>
            <Pie data={chartData} options={chartOptions} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8 }}>
            <button onClick={handleExport}>Export to Excel</button>
            <button onClick={handleExportCSV}>Export to CSV</button>
          </div>
        </div>
      )}
      <div className="filter-block">
        <label>
          Filter by Date:
          <input
            type="date"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
          <button onClick={() => setFilterDate('')}>Show All</button>
        </label>
      </div>
      <h2>Expenses</h2>
      <ul>
        {expenses
          .filter(exp => !filterDate || exp.date === filterDate)
          .map((exp, idx) => (
            <li key={idx} className="expense-item">
              {editingIndex === idx ? (
                <>
                  <input
                    type="number"
                    value={editExpense.amount}
                    onChange={e => setEditExpense({ ...editExpense, amount: e.target.value })}
                    required
                  />
                  <input
                    type="date"
                    value={editExpense.date}
                    onChange={e => setEditExpense({ ...editExpense, date: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    value={editExpense.note}
                    onChange={e => setEditExpense({ ...editExpense, note: e.target.value })}
                    required
                  />
                  <select
                    value={editExpense.category}
                    onChange={e => setEditExpense({ ...editExpense, category: e.target.value })}
                  >
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Others">Others</option>
                  </select>
                  <button
                    onClick={() => {
                      setExpenses(expenses.map((item, i) => i === idx ? editExpense : item));
                      setEditingIndex(null);
                    }}
                  >Save</button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
              ) : (
                <>
                  ₹{exp.amount} | {exp.date}
                  <span className={`category-badge category-${exp.category}`}>
                    {exp.category}
                  </span>
                  | {exp.note}
                  <button
                    onClick={() => setExpenses(expenses.filter((_, i) => i !== idx))}
                    title="Delete"
                    className="icon-button delete-btn"
                  >
                    <span className="material-icons">delete</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditExpense(exp);
                    }}
                    title="Edit"
                    className="icon-button edit-btn"
                  >
                    <span className="material-icons">edit</span>
                  </button>
                </>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
