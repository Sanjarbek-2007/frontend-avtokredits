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
            {posts.map(post => {
                const getPhoto = `http://localhost:8080/images/${post.id}`;
                return (
                    <div className="post-card" key={post.id}>
                        <h2>{post.title}</h2>
                        <img src={getPhoto} alt={post.fileName}/>
                        <p><strong> Brendi:</strong> {post.carBrand}</p>
                        <p><strong> Modeli:</strong> {post.carModel}</p>
                        <p><strong> Credit Oylar:</strong> {post.creditMonthCount}</p>
                        <p><strong> Narxi:</strong>  UZS {post.amount}</p>
                        <p><strong> Foizlar:</strong> {post.procents}%</p>
                        <Link to={`/posts/${post.id}`} className="learn-more-button">Ko'rib chiqish</Link>
                    </div>
                );
            })}
        </div>
    );
};

export default PostsComponent;
