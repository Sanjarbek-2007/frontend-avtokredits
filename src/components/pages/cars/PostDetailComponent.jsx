import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetailComponent.css';

const PostDetailComponent = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }
    const handleApply = () => {
        window.location.href = '/application'
    }
    return (
        <div className="post-detail-container">
            <h1>{post.title}</h1>
            <img src={post.path} alt={post.photoName}/>
            <p><strong>Car Brand:</strong> {post.carBrand}</p>
            <p><strong>Car Model:</strong> {post.carModel}</p>
            <p><strong>Credit Months:</strong> {post.creditMonthCount}</p>
            <p><strong>Amount:</strong> ${post.amount}</p>
            <p><strong>Procents:</strong> {post.procents}%</p>
            <p><strong>Description:</strong> {post.description}</p>

                <button onClick={handleApply}>Подать заявку на авто</button>

        </div>

    )
        ;
};

export default PostDetailComponent;
