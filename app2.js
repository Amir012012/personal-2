const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expenses-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);

  if (description === "" || isNaN(amount)) {
    alert("لطفاً توضیح و مبلغ را به درستی وارد کنید.");
    return;
  }

  transactions.push({
    id: Date.now(),
    description,
    amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateTransactionList();
  updateSummery();

  transactionFormEl.reset();
}

function updateTransactionList() {
  transactionListEl.innerHTML = "";

  const sortTransactions = [...transactions].reverse();

  sortTransactions.forEach((transaction) => {
    const transactionEL = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEL);
  });
}

function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expenses");
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>${formatCurrency(transaction.amount)}
    <button class='delete-btn' onclick='removeTransaction(${transaction.id})'>x</button>
    </span>
  `;
  return li;
}

function updateSummery() {
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expense);
}

function formatCurrency(number) {
  return new Intl.NumberFormat("en-US").format(number) + "";
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateSummery();
  updateTransactionList();
}

updateTransactionList();
updateSummery();
