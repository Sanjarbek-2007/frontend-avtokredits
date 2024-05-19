import React, { useState } from 'react';
import './Auth.css';

const Auth = ({ onAuth }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSwitchMode = () => {
        setIsLogin(prevState => !prevState);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? 'http://localhost:8080/auth/login' : 'http://localhost:8080/auth/signup';
        const data = isLogin ? { email, password } : { email, phoneNumber, password, username };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

            const { accessToken, username, role } = result;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);

            console.log(role); // Добавляем эту строку для отладки

            onAuth(username, role);

            window.location.href = '/success';
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };


    return (
        <div className="auth-container">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <>
                        <div className="form-control">
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required={!isLogin} />
                        </div>
                        <div className="form-control">
                            <label>Phone Number</label>
                            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required={!isLogin} />
                        </div>
                    </>
                )}
                <div className="form-control">
                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="form-control">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            <p onClick={handleSwitchMode}>
                {isLogin ? 'Don\'t have an account? Sign up here.' : 'Already have an account? Login here.'}
            </p>
        </div>
    );
};

export default Auth;
