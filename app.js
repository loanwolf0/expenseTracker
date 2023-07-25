// Retrieve existing expenses from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const expenseForm = document.getElementById('expenseForm');
const expenseTableBody = document.querySelector('#expenseTable tbody');

function displayExpenses() {
  // Clear the table body to avoid duplicates
  expenseTableBody.innerHTML = '';

  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.name}</td>
      <td>${expense.amount}</td>
    `;
    expenseTableBody.appendChild(row);
  });
}

function addExpense(e) {
  e.preventDefault();
  
  const expenseName = document.getElementById('expenseName').value;
  const expenseAmount = document.getElementById('expenseAmount').value;

  // Validate input
  if (!expenseName || !expenseAmount) {
    alert('Please enter both the expense name and amount.');
    return;
  }

  const expense = {
    name: expenseName,
    amount: parseFloat(expenseAmount)
  };

  expenses.push(expense);

  // Update local storage with the new expenses
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear the form inputs
  document.getElementById('expenseName').value = '';
  document.getElementById('expenseAmount').value = '';

  // Refresh the displayed expenses
  displayExpenses();
}

// Attach form submission event handler
expenseForm.addEventListener('submit', addExpense);

// Initial display of expenses
displayExpenses();
