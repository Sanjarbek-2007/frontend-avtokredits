import React, { useState, useEffect } from 'react';
import './Home.css'; // Import CSS file for styles
import car1 from '../../images/1.jpg'; // Import car images
import car2 from '../../images/2.jpg';
import car3 from '../../images/3.jpg';

const HomePage = () => {
    // Define your car images
    const carImages = [
        { src: car1, alt: 'Машина 1' },
        { src: car2, alt: 'Машина 2' },
        { src: car3, alt: 'Машина 3' },
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to switch to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    };

    useEffect(() => {
        // Automatically switch images every 3 seconds
        const intervalId = setInterval(nextImage, 3000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="homepage-container">
            {/* Container for the car images */}
            <div className="car-container">
                {carImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={index === currentImageIndex ? 'active' : ''}
                    />
                ))}
            </div>

            {/* Company's info */}
            <div className="company-info">
                <p>Company Name</p>
                <p>Address: XYZ Street, ABC City</p>
                <p>Phone: 123-456-7890</p>
                <p>Email: info@example.com</p>
            </div>
        </div>
    );
};

export default HomePage;
