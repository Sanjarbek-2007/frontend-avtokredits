import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
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

    const [applications, setApplications] = useState([]);
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
                    ...formData,
                    car: carDetails.carBrand + ' ' + carDetails.carModel,
                    car_Price: carDetails.amount
                });
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCarDetails();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const data = new FormData(form);
        data.append('customer', formData.fullName);

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

            form.reset();
            alert('Application submitted successfully');
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
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required/>

                    <label htmlFor="phone">Telefon raqami:</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required/>

                    <label htmlFor="car">Avtomobil:</label>
                    <input type="text" id="car" name="car" value={formData.car} readOnly/>

                    <label htmlFor="carPrice">Avtomobil Narxi:</label>
                    <input type="number" id="carPrice" name="carPrice" value={formData.car_Price} readOnly/>

                    <label htmlFor="loanAmount">Kredit Mablag'ini Kiriting:</label>
                    <input type="text" id="loanAmount" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required/>

                    <input type="submit" value="Arizani Yuborish"/>
                </form>
            </div>

            <div className="container">
                <h1>Arizalar</h1>
                {error && <p className="error">{error}</p>}
                <ul>
                    {applications.map(application => (
                        <li key={application.id}>
                            <h2>{application.title}</h2>
                            <p>{application.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ApplicationPage;
