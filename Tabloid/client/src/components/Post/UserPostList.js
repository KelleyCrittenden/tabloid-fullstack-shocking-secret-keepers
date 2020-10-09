import React, { useContext, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Button } from "reactstrap"
import Post from "./Post";
import { NavLink } from "react-router-dom";

const UserPostList = () => {
    const { posts, getAllPostsByUser } = useContext(PostContext);

    useEffect(() => {
        getAllPostsByUser(parseInt(sessionStorage.userProfileId));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"add"}><Button>New Post</Button></NavLink>
                <div className="cards-column">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserPostList;