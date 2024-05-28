import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

const ApplicationPage = () => {
    const location = useLocation();

    // Extract the postId from the URL
    const postId = new URLSearchParams(location.search).get('id');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        title: '',
        description: '',
        postId: 23,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/apps/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Form submitted successfully:', data);
            // Optionally, you can redirect to another page or show a success message
            window.location = '/success';
        } catch (error) {
            console.error('Error submitting the form:', error);
            // Handle the error appropriately, e.g., show an error message to the user
        }
    };
    const formStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
    };

    const inputStyles = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
    };

    const buttonStyles = {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const labelStyles = {
        alignSelf: 'flex-start',
        marginBottom: '5px',
    };

    return (
        <div style={formStyles}>
            <h1>Fill Form</h1>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div>
                    <label style={labelStyles}>
                        Full Name:
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </label>
                </div>
                <div>
                    <label style={labelStyles}>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </label>
                </div>
                <div>
                    <label style={labelStyles}>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </label>
                </div>
                <div>
                    <label style={labelStyles}>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            style={inputStyles}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit" style={buttonStyles}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ApplicationPage;
