import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Budget.css";

const BudgetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ category_name: "", budget_limit: "" });
  const [editingId, setEditingId] = useState(null);
  const userId = 1; // Example user ID

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(`http://localhost/fin-guard-api/getBudgetCategories.php?user_id=${userId}`);
    setCategories(response.data);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Edit category
      await axios.put("http://localhost/fin-guard-api/editBudgetCategory.php", { id: editingId, ...formData });
    } else {
      // Add category
      await axios.post("http://localhost/fin-guard-api/addBudgetCategory.php", { user_id: userId, ...formData });
    }
    fetchCategories();
    setFormData({ category_name: "", budget_limit: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete("http://localhost/fin-guard-api/deleteBudgetCategory.php", { data: { id } });
    fetchCategories();
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setFormData({ category_name: category.category_name, budget_limit: category.budget_limit });
  };

  return (
    <div className="budget-container">
      <h1>Budget Categories</h1>
      <form onSubmit={handleAddEdit}>
        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          value={formData.category_name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="budget_limit"
          placeholder="Budget Limit"
          value={formData.budget_limit}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{editingId ? "Update" : "Add"} Category</button>
      </form>

      <div className="budget-list">
        {categories.map((category) => (
          <div key={category.id} className="budget-item">
            <h3>{category.category_name}</h3>
            <p>Budget Limit: ${category.budget_limit}</p>
            <p>Spent: ${category.total_spent || 0}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${Math.min((category.total_spent / category.budget_limit) * 100, 100)}%`,
                  backgroundColor: category.total_spent > category.budget_limit ? "red" : "green",
                }}
              ></div>
            </div>
            <button onClick={() => handleEdit(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetCategories;
