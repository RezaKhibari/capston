import React, { useState } from "react";
import axios from "axios";
import "../styles/AccountManagement.css";

const AccountManagement = ({ userId }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const updateProfile = async () => {
        try {
            const response = await axios.post("http://localhost/fin-guard-api/update_account.php", {
                user_id: userId,
                ...formData,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    const deleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }
        try {
            const response = await axios.post("http://localhost/fin-guard-api/delete_account.php", {
                user_id: userId,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="account-management">
            <h2>Account Management</h2>
            {message && <div className="message">{message}</div>}
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>New Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button onClick={updateProfile} className="btn-update">Update Profile</button>
            <button onClick={deleteAccount} className="btn-delete">Delete Account</button>
        </div>
    );
};

export default AccountManagement;
