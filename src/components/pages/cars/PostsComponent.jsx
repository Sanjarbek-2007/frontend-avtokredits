import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostsComponent.css';

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        // Fetch posts
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));

        // Retrieve authentication data from localStorage
        const token = localStorage.getItem('accessToken');
        if (token) {
            const decodedToken = parseJwt(token);
            const userRole = decodedToken.roles;
            setIsLoggedIn(true);
            setRole(userRole);
        }
    }, []);

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
        return JSON.parse(jsonPayload);
    };

    const handleDeletePost = (postId) => {
        fetch(`http://localhost:8080/posts/delete/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.ok) {
                    setPosts(posts.filter(post => post.id !== postId));
                    console.log('Post deleted successfully');
                } else {
                    throw new Error(`Failed to delete post: ${response.status} ${response.statusText}`);
                }
            })
            .catch(error => console.error('Error deleting post:', error));
    };



    return (
        <div className="posts-container">
            {posts.map(post => (
                <div className="post-card image-container" key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={`http://localhost:8080/images/${post.id}`} alt={post.fileName} title={post.title} />
                    <p><strong>Car Brand:</strong> {post.carBrand}</p>
                    <p><strong>Car Model:</strong> {post.carModel}</p>
                    <p><strong>Credit Months:</strong> {post.creditMonthCount}</p>
                    <p><strong>Amount:</strong> UZS {post.amount}</p>
                    <p><strong>Procents:</strong> {post.procents}%</p>
                    <Link to={`/post/${post.id}`} className="learn-more-button">Learn More</Link>
                    {isLoggedIn && role === 'ADMIN' && (
                        <button
                            className="delete-button"
                            onClick={() => handleDeletePost(post.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostsComponent;
