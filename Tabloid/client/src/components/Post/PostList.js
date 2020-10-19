import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { Button } from "reactstrap"
import { NavLink } from "react-router-dom";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";

const PostList = () => {
    const { posts, getAllPosts, getAllPostsByUserId, recommendedPosts, setRecommendedPosts } = useContext(PostContext);
    const { tertiarySubscribed } = useContext(SubscriptionContext)
    const [complete, setComplete] = useState(false)

    useEffect(() => {

        getAllPosts();
        setRecommendedPosts([])
        setComplete(false);
        debugger
        for (let sub in tertiarySubscribed) {
            debugger
            getAllPostsByUserId(sub)
            if (sub == tertiarySubscribed[tertiarySubscribed.length - 1]) {
                setComplete(true);
            }
        }


    }, []);

    useEffect(() => {
        if (recommendedPosts.length == 0) {

        } else {
            for (let i = 0; i <= 3; i++) {
                let num = Math.floor(Math.random() * recommendedPosts.length)
                debugger
                let post = recommendedPosts[num];

                if (post.userProfileId == sessionStorage.activeUserId) {
                    i--
                }
                else {
                    posts.unshift(post)
                }
            }
        }

    }, [complete == true])

    return (

        <div className="container">
            <div className="row justify-content-center">
                <NavLink to={"post/add"}><Button>New Post</Button></NavLink>
                <div className="cards-column">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;