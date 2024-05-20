import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import './PostDetailComponent.css';

const PostDetailComponent = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const location = useLocation();
    // const { post } = location.state;
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // Fetch post details
        fetch(`http://localhost:8080/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));

        // Fetch photos
        fetch(`http://localhost:8080/images${id}/photos`)
            .then(response => response.json())
            .then(data => {
                const photoUrls = data.map((photo, index) => `/images/${id}/photos`);
                setPhotos(photoUrls);
            })
            .catch(error => console.error('Error fetching photos:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleApply = () => {
        window.location.href = '/application/'+id;
    };

    return (
        <div className="post-detail-container">
            <h1>{post.postTitle}</h1>
            <p><strong>Car Brand:</strong> {post.carBrand}</p>
            <p><strong>Car Model:</strong> {post.carModel}</p>
            <p><strong>Car Year:</strong> {post.carYear}</p>
            <p><strong>Car Color:</strong> {post.carColor}</p>
            <p><strong>Car Engine:</strong> {post.carEngine}</p>
            <p><strong>Car Gear:</strong> {post.carGear}</p>
            <p><strong>Car Fuel Type:</strong> {post.carFuelType}</p>
            <p><strong>Credit Months:</strong> {post.creditMonthCount}</p>
            <p><strong>Amount:</strong> ${post.amount}</p>
            <p><strong>Procents:</strong> {post.procents}%</p>
            <p><strong>Description:</strong> {post.carContent}</p>

            <div className="photo-gallery">
                {photos.map((photoUrl, index) => (
                    <img key={index} src={photoUrl} alt={`Photo ${index + 1}`} className="post-photo" />
                ))}
            </div>

            <button onClick={handleApply}>Ariza berish</button>
        </div>
    );
};

export default PostDetailComponent;
