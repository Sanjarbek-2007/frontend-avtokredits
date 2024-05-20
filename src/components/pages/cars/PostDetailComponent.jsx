import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import './PostDetailComponent.css';

const PostDetailComponent = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        // Fetch post details
        fetch(`http://localhost:8080/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleNextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % post.photoIds.length);
    };

    const handlePrevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + post.photoIds.length) % post.photoIds.length);
    };

    const handleApply = () => {
        window.location.href = '/application';
    };

    return (
        <div className="post-detail-container">
            <div className="photo-gallery">
                {post.photoIds && (
                    <div className="carousel">
                        <button className="carousel-button" onClick={handlePrevPhoto}>&#10094;</button>
                        <img
                            src={`http://localhost:8080/images/${post.photoIds[currentPhotoIndex]}/one`}
                            alt={`Photo ${currentPhotoIndex + 1}`}
                            className="post-photo"
                        />
                        <button className="carousel-button" onClick={handleNextPhoto}>&#10095;</button>
                    </div>
                )}
            </div>
            <h1>{post.carBrand} {post.carModel}</h1>
            <div className="post-details">
                <p><strong>Brendi:</strong> {post.carBrand}</p>
                <p><strong>Modeli:</strong> {post.carModel}</p>
                <p><strong>Yili:</strong> {post.carYear}</p>
                <p><strong>Rangi:</strong> {post.carColor}</p>
                <p><strong>Motor:</strong> {post.carEngine}</p>
                <p><strong>Karobka:</strong> {post.carGear}</p>
                <p><strong>Yoqilg'i:</strong> {post.carFuelType}</p>
                <p><strong>Kreditga oylar:</strong> {post.creditMonthCount}</p>
                <p><strong>Narxi:</strong> UZS {post.amount}</p>
                <p><strong>Foizlari:</strong> {post.procents}%</p>
                <p><strong>Tafsivi:</strong> {post.carContent}</p>
            </div>
            <Link to={`/uploadApp/${post.id}`} className="apply-button">Ariza qoldirish</Link>
        </div>
    );
};

export default PostDetailComponent;
