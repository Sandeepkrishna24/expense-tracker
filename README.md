# ExpenseMate – Personal Expense Tracker

A simple React app to track and manage personal expenses. Users can add, view, update, and delete expenses, with categories, filters, and summary reports.

---

## Features Implemented

- ✅ Add expense (amount, date, note, category)
- ✅ View expenses
- ✅ Update expense
- ✅ Delete expense
- ✅ Basic validation and error handling
- ✅ Categories (Food, Travel, Entertainment, Utilities, Others)
- ✅ Filter expenses (by date)
- ✅ Summary reports (total spent, pie chart by category)
- ✅ Save/Export expenses to file (CSV/Excel)

---

## Screenshots

Main UI dashboard (Dark Mode):
![Dashboard]<img width="814" height="876" alt="screenshot1 png" src="https://github.com/user-attachments/assets/fd480b0a-d033-4bb1-ab1b-1ed5e106a4eb" />


Empty state after clearing:
![Empty State]<img width="833" height="860" alt="screenshot2 png" src="https://github.com/user-attachments/assets/87661295-9ce7-4f53-9fb5-1114122db51e" />


Pie chart and categorized expenses:
![Pie Chart and Expenses]<img width="868" height="648" alt="screenshot3 png" src="https://github.com/user-attachments/assets/e03585a3-b9f9-4626-9e9b-272c0c19bd4a" />


---

## Expense Data Model

Each expense includes:
- `id`: unique identifier (number)
- `amount`: positive number
- `date`: string (YYYY-MM-DD)
- `note`: non-empty string
- `category`: string

---

## Validation Rules

- Amount must be a positive number
- Date must be a valid, non-empty string
- Note should not be empty
- Category is required

---

## Assumptions and Limitations

- Data is stored in memory—refreshing deletes all entries (unless exported)
- Exported files (CSV/Excel) allow you to save/share expenses
- UI designed for a single user, with a clean experience
- Easily extensible to use browser localStorage or database for persistence

---

## Sample Input/Output

Example Expense Input:
- Amount: 500
- Date: 2025-10-04
- Note: Groceries
- Category: Food

Result:
| Amount | Date       | Note      | Category |
|--------|------------|-----------|----------|
| 500    | 2025-10-04 | Groceries | Food     |

---

## How to Run Locally

1. Clone the repository or download/unzip the project folder
2. In the terminal, run: `npm install`
3. Start the app: `npm start`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Author

Sandeepkrishna P A
