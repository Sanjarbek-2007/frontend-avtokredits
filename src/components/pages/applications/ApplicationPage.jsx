import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Application.css';

const ApplicationPage = ({ username, role }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        carModel: '',
        carPrice: '',
        loanAmount: ''
    });

    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('Access token not found');
                }

                const decoded = jwtDecode(token);
                const expirationTime = decoded.exp * 1000;
                const currentTime = Date.now();

                if (expirationTime < currentTime) {
                    throw new Error('Token expired');
                }

                const response = await fetch('http://localhost:8080/apps', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }

                const responseData = await response.json();
                setApplications(responseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchApplications();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const data = new FormData(form);
        data.append('customer', username);

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
                <form id="applicationForm" onSubmit={handleSubmit}>
                    <label htmlFor="fullName">To'liq Ismingiz:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />

                    <label htmlFor="email">Elektron pochta:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="phone">Telefon raqami:</label>
                    <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

                    <label htmlFor="carModel">Avtomobil Modeli:</label>
                    <input type="text" id="carModel" name="carModel" value={formData.carModel} onChange={handleChange} required />

                    <label htmlFor="carPrice">Avtomobil Narxi:</label>
                    <input type="text" id="carPrice" name="carPrice" value={formData.carPrice} onChange={handleChange} required />

                    <label htmlFor="loanAmount">Kredit Mablag'ini Kiriting:</label>
                    <input type="text" id="loanAmount" name="loanAmount" value={formData.loanAmount} onChange={handleChange} required />

                    <input type="submit" value="Arizani Yuborish" />
                </form>
            </div>

            <div className="container">
                <h1>Zayavka</h1>
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

