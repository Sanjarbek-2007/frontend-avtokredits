import React, { useState } from 'react';
import { useParams  } from 'react-router-dom';
import axios from 'axios';

import './ApplicationUpload.css'; // Import CSS file for styling

const ApplicationUpload = ({ username, role }) => {
    const { postId } = useParams();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [car, setCar] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/apps/add', {
                fullName,
                phone,
                car: postId,
                title,
                description,
                post: postId
            });
            alert('Application uploaded:', response.data);

        } catch (error) {
            console.error('Error uploading application:', error);
        }
    };

    return (
        <div className="application-upload-container">
            <h1>Upload Application</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                </div>
                <div className="form-control">
                    <label htmlFor="phone">Phone:</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>

                <div className="form-control">
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-control">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description}
                              onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ApplicationUpload;
