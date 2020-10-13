import React, { useState, createContext } from "react";
import * as firebase from "firebase/app";

export const PostTagContext = createContext();

export const PostTagProvider = (props) => {

    const [postTags, setPostTags] = useState([]);
    const [postTag, setPostTag] = useState({});

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllPostTagsByPost = (postId) => {
        return getToken().then((token) => {
            fetch(`/api/posttag/getposttags/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setPostTags);
        })
    };


    const addPostTag = (newPostTag) => {
        return getToken().then((token) => {
            fetch("/api/postTag/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newPostTag)
            })
        })
    };

    const deletePostTag = (postTagId) => {
        return getToken().then((token) => {
            fetch(`/api/postTag/${postTagId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    return (

        <PostTagContext.Provider value={{ postTags, postTag, getAllPostTagsByPost, addPostTag, deletePostTag }}>
            {props.children}
        </PostTagContext.Provider>
    );
}