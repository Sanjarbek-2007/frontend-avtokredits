import React, { useEffect, useState } from 'react';
import './Applications.css';

const Applications = () => {
    const [applications, setApplications] = useState([
        { id: 1, name: 'shstfhsf', description: 'dfgfdgfdg' },
        { id: 2, name: 'dfhghfh', description: 'fdhdfgfd' },
        { id: 3, name: 'dfghfhfhd', description: 'fdgd' },
    ]);
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
    }

    const handleCloseClick = () => {
        setSelectedApplication(null);
    }

    return (
        <div className="applications-container">
            <h1>Arizalar</h1>
            <ul className="application-list">
                {applications.map(application => (
                    <li
                        key={application.id}
                        onClick={() => handleApplicationClick(application)}
                        className="application-item"
                    >
                        {application.name}
                    </li>
                ))}
            </ul>
            {selectedApplication && (
                <div className="modal-overlay" onClick={handleCloseClick}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>{selectedApplication.name}</h2>
                        <p>{selectedApplication.description}</p>
                        <button className="close-button" onClick={handleCloseClick}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Applications;
