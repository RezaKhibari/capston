import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar-modern">
                <div className="container-modern">
                    <a className="logo" href="/">
                        FinGuard
                    </a>
                    <div className="nav-buttons">
                        <button
                            className="btn-modern btn-login"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="btn-modern btn-register"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-modern">
                <div className="hero-content">
                    <h1>Welcome to FinGuard</h1>
                    <p>Take control of your finances with our smart tools and insights.</p>
                    <button
                        className="btn-modern btn-cta"
                        onClick={() => navigate("/register")}
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="features-modern">
                <h2 className="features-title">Explore Our Features</h2>
                <div className="feature-cards">
                    {/* Dashboard */}
                    <div className="feature-card">
                        <h3>Dashboard</h3>
                        <p>Get an overview of your financial health, track balances, and manage your accounts effectively.</p>
                        <button
                            className="btn-modern btn-feature"
                            onClick={() => navigate("/dashboard")}
                        >
                            Explore Dashboard
                        </button>
                    </div>

                    {/* Transaction Management */}
                    <div className="feature-card">
                        <h3>Transaction Management</h3>
                        <p>Add, edit, or delete transactions, and categorize them to stay on top of your income and expenses.</p>
                        <button
                            className="btn-modern btn-feature"
                            onClick={() => navigate("/transactions")}
                        >
                            Manage Transactions
                        </button>
                    </div>

                    {/* Budget Planning */}
                    <div className="feature-card">
                        <h3>Budget Planning</h3>
                        <p>Set monthly budgets for different categories and track your spending with real-time alerts.</p>
                        <button
                            className="btn-modern btn-feature"
                            onClick={() => navigate("/budget")}
                        >
                            Plan Budget
                        </button>
                    </div>

                    {/* Currency Support */}
                    <div className="feature-card">
                        <h3>Currency Support</h3>
                        <p>Select your preferred currency and get live exchange rates for better financial insights.</p>
                        <button
                            className="btn-modern btn-feature"
                            onClick={() => navigate("/currency")}
                        >
                            Currency Options
                        </button>
                    </div>

                    {/* Account Management */}
                    <div className="feature-card">
                        <h3>Account Management</h3>
                        <p>Update your profile or delete your account with ease using our account management tools.</p>
                        <button
                            className="btn-modern btn-feature"
                            onClick={() => navigate("/account")}
                        >
                            Manage Account
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-modern">
                <div className="container-modern">
                    <p>© 2024 FinGuard. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
