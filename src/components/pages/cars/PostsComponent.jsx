import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PostsComponent.css'; // Add your styles here

const PostsComponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="posts-container">
            {posts.map(post => (
                <div className="post-card" key={post.id}>
                    <h2>{post.title}</h2>
                    <img src={post.path} alt={post.photoName} />
                    <p><strong>Car Brand:</strong> {post.carBrand}</p>
                    <p><strong>Car Model:</strong> {post.carModel}</p>
                    <p><strong>Credit Months:</strong> {post.creditMonthCount}</p>
                    <p><strong>Amount:</strong> ${post.amount}</p>
                    <p><strong>Procents:</strong> {post.procents}%</p>
                    <Link to={`/post/${post.id}`} className="learn-more-button">Learn More</Link>
                </div>
            ))}
        </div>
    );
};

export default PostsComponent;
