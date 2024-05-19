import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/pages/auth/Auth";
import PaymentTimeTable from "./components/pages/paymentTimeTable/PaymentTimeTable";
import Calculator from "./components/pages/calculator/Calculator";
import AuthSuccess from "./components/success/AuthSuccess";
import About from "./components/pages/about/About";
import Upload from "./components/pages/cars/upload/Upload";
// import Post from "./components/pages/cars/previous/Post";
import ApplicationPage from "./components/pages/applications/ApplicationPage";
import './components/pages/home/Home.css';
import logo from "./components/images/logo.png";
import PostsComponent from "./components/pages/cars/PostsComponent";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [showAdditionalMenu, setShowAdditionalMenu] = useState(false); // Объявляем состояние для отображения дополнительного меню


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.roles;
      setIsLoggedIn(true);
      setUsername(decodedToken.sub);
      setRole(userRole);
    }
  }, []);

  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  const handleAuth = (username, role) => {
    setIsLoggedIn(true);
    setUsername(username);
    setRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
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

  const toggleAdditionalMenu = () => {
    setShowAdditionalMenu(!showAdditionalMenu); // Изменение состояния отображения дополнительного меню
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
          {/*<button className="navbar-button" onClick={showApplications}>Zayavka berish</button>*/}
          {/*<button className="navbar-button back-button" id="backButton" onClick={showAll}>Orqaga</button>*/}

          {/*{isLoggedIn && role === 'ADMIN' && (*/}
          {/*    <button className="navbar-button" onClick={openAddListingForm}>E'lon berish</button>*/}
          {/*)}*/}
          {/*<button className="navbar-button" onClick={toggleAdditionalMenu}>Menu</button> /!* Кнопка для отображения/скрытия дополнительного меню *!/*/}
          {/*{showAdditionalMenu && ( // Показывать дополнительное меню только если showAdditionalMenu равен true*/}
          {/*    <>*/}
          {/*      <button className="navbar-button" onClick={showAllPaymentTime}>To'lov vaqti</button>*/}
          {/*      <button className="navbar-button" onClick={showApplications}>Zayavka berish</button>*/}
          {/*      {isLoggedIn && role === 'ADMIN' && (*/}
          {/*          <button className="navbar-button" onClick={openAddListingForm}>E'lon berish</button>*/}
          {/*      )}*/}
          {/*    </>*/}
          {/*)}*/}
          <div className="navbar-search">
            <input type="text" className="search-input" placeholder="" onInput={searchImages}/>
            {isLoggedIn ? (
                <>
                  {/*<span className="navbar-username">{username}</span>*/}
                  <a href="#" className="navbar-button">{username}</a>
                  <button className="navbar-button" onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <a href="Auth" className="navbar-login-button">Login</a>
            )}
          </div>
        </div>
        {showAdditionalMenu && (
            <div className="additional-menu-container">
              <div className="additional-menu">
                <button className="additional-menu-button" onClick={showAllPaymentTime}>To'lov vaqti</button>
                <button className="additional-menu-button" onClick={showApplications}>Zayavka berish</button>
                {isLoggedIn && role === 'ADMIN' && (
                    <button className="additional-menu-button" onClick={openAddListingForm}>E'lon berish</button>
                )}
              </div>
            </div>
        )}

        {/* Кнопка для отображения/скрытия дополнительного меню */}
        <button className="additional-menu-toggle" onClick={toggleAdditionalMenu}>
          {showAdditionalMenu ? "Hide Menu" : "Show Menu"}
        </button>

        <BrowserRouter>
          <Routes>
            <Route path="/payments" element={<PaymentTimeTable/>}/>
            {/*<Route path="/cars" element={<Post/>}/>*/}
            <Route path="/cars" element={<PostsComponent/>}/>
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
