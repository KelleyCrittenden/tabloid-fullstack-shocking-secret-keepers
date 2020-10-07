import React, { useState, useEffect, createContext } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);

    const getAllCommentsForPost = (postId) => {
        return fetch(`/api/getallcommentsbypost/${postId}`)
            .then((res) => res.json())
            .then(setComments);
    };

    // const addPost = (post) => {
    //     return fetch("/api/post", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(post),
    //     });
    // };

    // const searchPosts = (searchInput, isSortDesc) => {
    //     return fetch(`/api/post/search?q=${searchInput}&sortDesc=${isSortDesc}`)
    //         .then((res) => res.json())
    //         .then(setPosts);
    // }

    // const getAllPostsWithComments = () => {
    //     return fetch("/api/post/getwithcomments")
    //         .then((res) => res.json())
    //         .then(setPosts);
    // }

    // const getPost = (id) => {
    //     return fetch(`/api/post/getwithcomments/${id}`)
    //         .then((res) => res.json())
    // }

    return (

        <CommentContext.Provider value={{ comments, getAllCommentsForPost }}>
            {props.children}
        </CommentContext.Provider>
    );
}