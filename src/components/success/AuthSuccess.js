import React from 'react';

const AuthSuccess = () => {
    const home = () => {
        window.location.href = '/';
    };

    return (
        <div>
            <button className="button" onClick={home}>Success login</button>
        </div>
    );
};

export default AuthSuccess;