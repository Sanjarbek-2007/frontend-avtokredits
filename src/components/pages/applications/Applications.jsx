import React, { useEffect, useState } from 'react';
import './Applications.css';
import { Link } from 'react-router-dom';

const Applications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/apps')
            .then(response => response.json())
            .then(data => {
                // Sort the applications
                const sortedApplications = data.sort((a, b) => {
                    if (a.post.isActive && !b.post.isActive) return -1;
                    if (!a.post.isActive && b.post.isActive) return 1;
                    if (a.isAccepted && !b.isAccepted) return -1;
                    if (!a.isAccepted && b.isAccepted) return 1;
                    return 0;
                });
                setApplications(sortedApplications);
            })
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="applications-container">
            {applications.map(application => {
                const { post, isAccepted, post: { isActive } } = application;
                const photoUrl =  `http://localhost:8080/images/${post.id}`; // Add a default image URL if no photo exists

                // Determine the class name based on the conditions
                let className = 'application-card';
                if (isAccepted) {
                    className += ' accepted';
                } else if (isActive) {
                    className += ' active';
                } else {
                    className += ' closed';
                }

                return (
                    <div key={application.id} className={className}>
                        <div className="application-details">
                            <h2>{application.title || 'Untitled'}</h2>
                            <h3>{application.fullName}</h3>
                            <h3>{application.phone}</h3>
                            <p>{application.description}</p>
                        </div>
                        <Link to={`/post/${application.post.id}`}>
                            <button className="application-button">
                                <img src={photoUrl}  title={application.title} />
                            </button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Applications;
