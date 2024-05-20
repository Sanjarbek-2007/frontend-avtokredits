import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetailComponent.css';

const PostDetailComponent = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // Fetch post details
        fetch(`http://localhost:8080/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post:', error));

        // Fetch photos
        fetch(`http://localhost:8080/images/${id}/all`)
            .then(response => response.json())
            .then(data => setPhotos(data))
            .catch(error => console.error('Error fetching photos:', error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleApply = () => {
        window.location.href = '/application';
    };

    return (
        <div className="post-detail-container">
            <h1>{post.postTitle}</h1>
            <p><strong> Brendi:</strong> {post.carBrand}</p>
            <p><strong> Modeli:</strong> {post.carModel}</p>
            <p><strong> Yili:</strong> {post.carYear}</p>
            <p><strong> Rangi:</strong> {post.carColor}</p>
            <p><strong> Motor:</strong> {post.carEngine}</p>
            <p><strong> Karobka:</strong> {post.carGear}</p>
            <p><strong> Yoqilg'i:</strong> {post.carFuelType}</p>
            <p><strong> Kreditga oylar:</strong> {post.creditMonthCount}</p>
            <p><strong> Narxi:</strong>  UZS {post.amount}</p>
            <p><strong> Foizlari:</strong> {post.procents}%</p>
            <p><strong> Tafsivi :</strong> {post.carContent}</p>

            <div className="photo-gallery">
                {photos.map((photo, index) => (
                    <img key={index} src={`http://localhost:8080/images/${photo.id}`} alt={`Photo ${index + 1}`} className="post-photo"/>
                ))}
            </div>

            <button onClick={handleApply}>Подать заявку на авто</button>
        </div>
    );
};

export default PostDetailComponent;
