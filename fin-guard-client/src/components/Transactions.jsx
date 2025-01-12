import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Transaction.css";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category_id: "",
    currency_code: "USD",
    description: "",
    transaction_date: "",
    transaction_type: "income",
    user_id: 1,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost/fin-guard-api/getTransactions.php");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put("http://localhost/fin-guard-api/editTransaction.php", {
          id: editingId,
          ...formData,
        });
      } else {
        await axios.post("http://localhost/fin-guard-api/addTransaction.php", formData);
      }
      fetchTransactions();
      resetForm();
    } catch (error) {
      console.error("Error adding/editing transaction:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost/fin-guard-api/deleteTransaction.php", {
        data: { id },
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      amount: transaction.amount,
      category_id: transaction.category_id,
      currency_code: transaction.currency_code,
      description: transaction.description,
      transaction_date: transaction.transaction_date,
      transaction_type: transaction.transaction_type,
      user_id: transaction.user_id,
    });
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      category_id: "",
      currency_code: "USD",
      description: "",
      transaction_date: "",
      transaction_type: "income",
      user_id: 1,
    });
    setEditingId(null);
  };

  return (
    <div className="transaction-container">
      <h1>Transaction Management</h1>
      <form onSubmit={handleAddEdit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="transaction_date"
          value={formData.transaction_date}
          onChange={handleInputChange}
          required
        />
        <select name="currency_code" value={formData.currency_code} onChange={handleInputChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
        <select name="transaction_type" value={formData.transaction_type} onChange={handleInputChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          name="category_id"
          placeholder="Category ID"
          value={formData.category_id}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Transaction</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Currency</th>
            <th>Type</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>{transaction.transaction_date}</td>
              <td>{transaction.currency_code}</td>
              <td>{transaction.transaction_type}</td>
              <td>{transaction.category_id}</td>
              <td>
                <button onClick={() => handleEdit(transaction)}>Edit</button>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
