import React, { useState, useEffect } from 'react';
import { getCars } from './Cars';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await getCars();
                setPosts(postsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const openPopup = (post) => {
        setSelectedPost(post);
    };

    const closePopup = () => {
        setSelectedPost(null);
    };

    return (
        <div>
            <h2>Posts</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {posts.length === 0 ? (
                        <p>No posts found.</p>
                    ) : (
                        posts.map(post => (
                            <div key={post.id} className="post-card">
                                <img src={post.photoPath} alt="Post" />
                                <div className="post-details">
                                    <div className="post-summary" onClick={() => openPopup(post)}>
                                        <h3>{post.title}</h3>
                                        <p>{post.content}</p>
                                        <div className="price">{post.car.tarrif.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </>
            )}

            {selectedPost && (
                <div id="popupContainer" className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h2>{selectedPost.title}</h2>
                        <p>{selectedPost.content}</p>
                        <div className="car-details">
                            <h4>Car Details</h4>
                            <p><strong>Brand:</strong> {selectedPost.car.brand}</p>
                            <p><strong>Model:</strong> {selectedPost.car.model}</p>
                            <p><strong>Year:</strong> {selectedPost.car.year}</p>
                            <p><strong>Color:</strong> {selectedPost.car.color}</p>
                            <p><strong>Engine:</strong> {selectedPost.car.engine}</p>
                            <p><strong>Gear:</strong> {selectedPost.car.gear}</p>
                            <p><strong>Fuel Type:</strong> {selectedPost.car.fuelType}</p>
                            <h4>Tariff</h4>
                            <p><strong>Name:</strong> {selectedPost.car.tarrif.name}</p>
                            <p><strong>Price:</strong> {selectedPost.car.tarrif.price}</p>
                            <p><strong>Count Months:</strong> {selectedPost.car.tarrif.countMonths}</p>
                            <p><strong>Procents:</strong> {selectedPost.car.tarrif.procents}</p>
                            <p><strong>Total:</strong> {selectedPost.car.tarrif.total}</p>
                        </div>
                        <div className="author-details">
                            <h4>Author Details</h4>
                            <p><strong>Email:</strong> {selectedPost.author.email}</p>
                            <p><strong>Phone Number:</strong> {selectedPost.author.phoneNumber}</p>
                            <p><strong>Username:</strong> {selectedPost.author.username}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostList;
