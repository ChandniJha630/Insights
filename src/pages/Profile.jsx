
import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
const [posts, setPosts] = useState([]);
const { slug } = useParams();
const navigate = useNavigate();

const userData = useSelector((state) => state.auth.userData);

useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            // Filter posts based on the user ID condition
            const filteredPosts = posts.documents.filter(post => post.userId === userData.$id);
            setPosts(filteredPosts);
        }
    });
}, [userData]); // Make sure to include userData in the dependency array

    return (
        <div className='w-full py-8 mt-8'>
            <Container>
                <div className='block h-1/3 center'>
                    <h1><b>UserName:</b> {userData.name}</h1>
                    <h1><b>Email:</b> {userData.email}</h1>
                </div>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className='mt-16 h-1/2 w-full  text-center'>
                            <p className='py-auto text-2xl text-slate-600 italic'>No posts yet.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Profile;
