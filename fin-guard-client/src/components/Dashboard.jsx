import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrencySelector from "./CurrencySelector";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    // Fetch transactions from the database
    axios
      .get("http://localhost/fin-guard-api/get_transactions.php")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));

    // Fetch exchange rates
    axios
      .get("http://localhost/fin-guard-api/currency_rates.php")
      .then((response) => setExchangeRates(response.data.rates))
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const convertCurrency = (amount, baseCurrency) => {
    const rate = exchangeRates[selectedCurrency] / exchangeRates[baseCurrency];
    return (amount * rate).toFixed(2);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <CurrencySelector onCurrencyChange={setSelectedCurrency} />
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount ({selectedCurrency})</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.transaction_date}</td>
              <td>{transaction.description}</td>
              <td>
                {convertCurrency(transaction.amount, transaction.currency_code)}{" "}
                {selectedCurrency}
              </td>
              <td>{transaction.category_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
