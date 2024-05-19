// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import './Home.css';
// import logo from '../../images/logo.png';
// import About from "../about/About";
// const HomePage = () => {
//     const [favorites, setFavorites] = useState([]);
//
//     const showCompanyInfo = () => {
//         const companyInfoPopup = document.getElementById("companyInfo");
//         companyInfoPopup.innerHTML = '';
//         ReactDOM.render(<About />, companyInfoPopup);
//         companyInfoPopup.style.display = "block";
//     };
//
//     const showAllCars = () => {
//         // Function to show all cars
//     };
//
//
//
//     const searchImages = () => {
//         const input = document.querySelector('.search-input').value.toLowerCase();
//         const imageContainers = document.querySelectorAll('.image-container');
//         imageContainers.forEach(container => {
//             const altText = container.querySelector('img').alt.toLowerCase();
//             if (altText.includes(input)) {
//                 container.style.display = "inline-block";
//             } else {
//                 container.style.display = "none";
//             }
//         });
//     };
//
//     const showFavorites = () => {
//         const imageContainers = document.querySelectorAll('.image-container');
//         const backButton = document.getElementById('backButton');
//         const favoriteIds = favorites.map(favorite => favorite.id);
//
//         imageContainers.forEach(container => {
//             const imageNumber = parseInt(container.id.replace('imageContainer', ''), 10);
//             if (favoriteIds.includes(imageNumber)) {
//                 container.style.display = "inline-block";
//             } else {
//                 container.style.display = "none";
//             }
//         });
//
//         backButton.style.display = "inline-block";
//     };
//
//     const showAllPaymentTime = () => {
//     };
//
//     const openAddListingForm = () => {
//         const modal = document.getElementById('addListingModal');
//         modal.style.display = 'block';
//     };
//
//     const showAll = () => {
//         const imageContainers = document.querySelectorAll('.image-container');
//         const backButton = document.getElementById('backButton');
//         imageContainers.forEach(container => {
//             container.style.display = "inline-block";
//         });
//         backButton.style.display = "none";
//     };
//
//
//     return (
//         <div className="App">
//             <div className="navbar">
//                 {/*<button className="navbar-logo">*/}
//                 {/*    <img src={logo} alt="Mashina Galereya"/>*/}
//                 {/*</button>*/}
//                 <a href="#" className="navbar-logo"><img src={logo} alt="Mashina Galereya"/></a>
//                 <button className="navbar-button" onClick={showCompanyInfo}>AvtoKredits haqida ko'proq</button>
//                 <button className="navbar-button" onClick={showAllCars}>AvtoKredits Mashinalar</button>
//                 <button className="navbar-button" onClick={showFavorites}>Sevimlilar</button>
//                 <button className="navbar-button" onClick={showAllPaymentTime}>To'lov vaqti</button>
//                 <button className="navbar-button back-button" id="backButton" onClick={showAll}>Orqaga</button>
//                 <button className="navbar-button" onClick={openAddListingForm}>E'lon berish</button>
//                 <div className="navbar-search">
//                     <input type="text" className="search-input" placeholder="" onInput={searchImages}/>
//                     <a href="Auth" className="navbar-login-button">Login</a>
//                     <a href="http://localhost:3000/auth/" className="navbar-signup-button">Signup</a>
//                 </div>
//             </div>
//             <div id="companyInfo"></div>
//             <div id="addListingModal" className="modal">
//                 <div className="modal-content">
//                     <span className="close" onClick={() => document.getElementById('addListingModal').style.display = 'none'}>&times;</span>
//                     <textarea placeholder="Add your listing here..."></textarea>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default HomePage;
