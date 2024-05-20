import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationPage = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8080/apps');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h1>Applications</h1>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul>
                    {applications.map((app, index) => (
                        <li key={index}>
                            <h2>{app.name}</h2>
                            <p>{app.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApplicationPage;
