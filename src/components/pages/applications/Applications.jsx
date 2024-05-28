import React, { useEffect, useState } from 'react';
import './Applications.css';
import { Link } from 'react-router-dom';

const Applications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/apps')
            .then(response => response.json())
            .then(data => {
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

    const handleAccept = (id) => {
        fetch(`http://localhost:8080/apps/${id}/accept`, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to accept application');
                }
                // Обновляем состояние applications после успешного обновления на сервере
                setApplications(prevApplications => {
                    return prevApplications.map(application => {
                        if (application.id === id) {
                            return {...application, isAccepted: true};
                        }
                        return application;
                    });
                });
            })
            .catch(error => console.error('Error accepting application:', error));
    };

    const handleClosed = (id) => {
        fetch(`http://localhost:8080/apps/${id}/close`, {
            method: 'PUT'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to accept application');
                }
                // Обновляем состояние applications после успешного обновления на сервере
                setApplications(prevApplications => {
                    return prevApplications.map(application => {
                        if (application.id === id) {
                            return {...application, isAccepted: false, post: {...application.post, isActive: false}};
                        }
                        return application;
                    });
                });
            })
            .catch(error => console.error('Error rejecting application:', error));
    };



    return (
        <div className="applications-container">
            {applications.map(application => {
                const {id, post, isAccepted, post: {isActive}} = application;
                const photoUrl = `http://localhost:8080/images/${post.id}`;

                let className = 'application-card';
                if (isAccepted) {
                    className += ' accepted';
                } else if (isActive) {
                    className += ' active';
                } else {
                    className += ' closed';
                }

                return (
                    <div key={id} className={className}>
                        <div className="application-details">
                            <h2>{application.title || 'Untitled'}</h2>
                            <h3>{application.fullName}</h3>
                            <h3>{application.phone}</h3>
                            <h3>{application.description}</h3>
                        </div>
                        <div className="application-buttons">
                            {isActive && !isAccepted && (
                                <>
                                    <button onClick={() => handleAccept(id)} className="accept-button">&#10004;</button>
                                    <button onClick={() => handleClosed(id)} className="close-button">&#10006;</button>
                                </>
                            )}
                        </div>
                        <Link to={`/post/${application.post.id}`}>
                            <button className="application-button">
                                <img src={photoUrl} title={application.title}/>
                            </button>
                        </Link>
                    </div>
                );
            })}
        </div>
    );

}

export default Applications;
