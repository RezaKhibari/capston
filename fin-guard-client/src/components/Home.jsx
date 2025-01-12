import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
                        <button className="btn-modern btn-login"
                            onClick={() => navigate("/login")}>Login</button>
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
                    <button className="btn-modern btn-cta">Get Started</button>
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