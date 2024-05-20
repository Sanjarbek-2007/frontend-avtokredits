import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Application.css';

const ApplicationPage = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        car: '',
        car_Price: '',
        loanAmount: ''
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch car details');
                }
                const carDetails = await response.json();
                setFormData({
                    car: `${carDetails.carBrand} ${carDetails.carModel}`,
                    car_Price: carDetails.amount,
                    fullName: '',
                    phone: '',
                    loanAmount: ''
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        try {
            const token = localStorage.getItem('accessToken');
            const response = await fetch('http://localhost:8080/apps/add', {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            alert('Application submitted successfully');
            setFormData({
                fullName: '',
                phone: '',
                car: '',
                car_Price: '',
                loanAmount: ''
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <div className="container">
                <h1>Avtokreditlar Uchun Ariza Formasi</h1>
                {error && <p className="error">{error}</p>}
                <form id="applicationForm" onSubmit={handleSubmit}>
                    <label htmlFor="fullName">To'liq Ismingiz:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />

                    <label htmlFor="phone">Telefon raqami:</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label htmlFor="car">Avtomobil:</label>
                    <input type="text" id="car" name="car" value={formData.car} readOnly />

                    <label htmlFor="carPrice">Avtomobil Narxi:</label>
                    <input type="number" id="carPrice" name="carPrice" value={formData.car_Price} onChange={handleChange} required />

                    <label htmlFor="loanAmount">Kredit Mablag'ini Kiriting:</label>
                    <input type="text" id="loanAmount" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

                    <input type="submit" value="Arizani Yuborish" />
                </form>
            </div>
        </div>
    );
};

export default ApplicationPage;
