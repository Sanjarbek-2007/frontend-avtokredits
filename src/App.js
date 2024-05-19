import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/pages/auth/Auth";
import PaymentTimeTable from "./components/pages/paymentTimeTable/PaymentTimeTable";
import Calculator from "./components/pages/calculator/Calculator";
import AuthSuccess from "./components/success/AuthSuccess";
import About from "./components/pages/about/About";
import Upload from "./components/pages/cars/upload/Upload";
import Post from "./components/pages/cars/Post";
import ApplicationPage from "./components/pages/applications/ApplicationPage";
import './components/pages/home/Home.css';
import logo from "./components/images/logo.png";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('role');
    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setRole(storedRole);
    }
  }, []);

  const handleAuth = (username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    window.location.href = '/';
  };

  const showCompanyInfo = () => {
    window.location.href = '/about';
  };

  const home = () => {
    window.location.href = '/';
  };

  const showAllPaymentTime = () => {
    window.location.href = '/payments';
  };

  const showAllCars = () => {
    window.location.href = '/cars';
  };

  const showApplications = () => {
    window.location.href = '/application';
  };

  const searchImages = () => {
    const input = document.querySelector('.search-input').value.toLowerCase();
    const imageContainers = document.querySelectorAll('.image-container');
    imageContainers.forEach(container => {
      const altText = container.querySelector('img').alt.toLowerCase();
      if (altText.includes(input)) {
        container.style.display = "inline-block";
      } else {
        container.style.display = "none";
      }
    });
  };

  const showFavorites = () => {
    const imageContainers = document.querySelectorAll('.image-container');
    const backButton = document.getElementById('backButton');
    imageContainers.forEach(container => {
      if (container.classList.contains('favorite')) {
        container.style.display = "inline-block";
      } else {
        container.style.display = "none";
      }
    });
    backButton.style.display = "inline-block";
  };

  const openAddListingForm = () => {
    window.location.href = '/upload';
  };

  const showAll = () => {
    const imageContainers = document.querySelectorAll('.image-container');
    const backButton = document.getElementById('backButton');
    imageContainers.forEach(container => {
      container.style.display = "inline-block";
    });
    backButton.style.display = "none";
  };

  return (
      <div>
        <div className="navbar">
          <a href="#" className="navbar-logo" onClick={home}>
            <img src={logo} alt="Mashina Galereya"/>
          </a>
          <button className="navbar-button" onClick={showCompanyInfo}>AvtoKredits haqida ko'proq</button>
          <button className="navbar-button" onClick={showAllCars}>AvtoKredits Mashinalar</button>
          <button className="navbar-button" onClick={showFavorites}>Sevimlilar</button>
          <button className="navbar-button" onClick={showAllPaymentTime}>To'lov vaqti</button>
          <button className="navbar-button" onClick={showApplications}>Zayavka berish</button>
          <button className="navbar-button back-button" id="backButton" onClick={showAll}>Orqaga</button>
          <button className="navbar-button" onClick={openAddListingForm}>E'lon berish</button>
          <div className="navbar-search">
            <input type="text" className="search-input" placeholder="" onInput={searchImages}/>
            {isLoggedIn ? (
                <>
                  <span className="navbar-username">{username}</span>
                  <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <a href="Auth" className="navbar-login-button">Login</a>
            )}
          </div>
        </div>

        <BrowserRouter>
          <Routes>
            <Route path="/payments" element={<PaymentTimeTable/>}/>
            <Route path="/cars" element={<Post/>}/>
            <Route path="/upload" element={<Upload/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/calculator" element={<Calculator/>}/>
            <Route path="/auth" element={<Auth onAuth={handleAuth}/>}/>
            <Route path="/success" element={<AuthSuccess/>}/>
            <Route path="/application" element={<ApplicationPage username={username} role={role} />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;
