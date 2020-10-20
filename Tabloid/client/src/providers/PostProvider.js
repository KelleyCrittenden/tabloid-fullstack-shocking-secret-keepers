import React, { useState, useContext, useEffect } from "react";
import { SubscriptionContext } from "./SubscriptionProvider";

import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export function PostProvider(props) {
    const [posts, setPosts] = useState([]);
    let [recommendedPosts, setRecommendedPosts] = useState([]);
    const [post, setPost] = useState({ userProfile: {}, category: {} });
    const [userPosts, setUserPosts] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const [categories, setCategories] = useState([])
    const [complete, setComplete] = useState(false)

    const getAllPosts = () => {






        getToken().then((token) => fetch("/api/post", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setPosts(res)

            }));

    };

    const getAllPostsByUserId = (id) => {
        getToken().then((token) => fetch(`/api/post/recommended/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json())
            .then((res) => {
                for (let post in res) {
                    recommendedPosts.push(post)
                }

            }));
    };

    const addPost = (post) => {
        getToken().then((token) => fetch("/api/post", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            }
            throw new Error("Unauthorized");
        }))
    };
    const getAllSearch = (search) => {
        getToken().then((token) => fetch(`/api/post/search?q=${search}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
            .then((res) => res.json())
            .then(setPosts);
    };
    const getPost = (id) => {
        getToken().then((token) => fetch(`/api/post/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).then((res) => res.json()).then((res) => {
            setPost(res)



        });

    };

    const getAllPostsByUser = (id) => {
        getToken().then((token) => fetch(`/api/post/User/${id}`, {
            method: "Get",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
            .then((res) => res.json())
            .then(setUserPosts);
    };
    const editPost = (id, post) => {
        getToken().then((token) => fetch(`/api/post/edit/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        })
        )
    };
    const softDeletePost = (id) => {
        getToken().then((token) => fetch(`/api/post/delete/${id}`, {
            method: "Put",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },

        }))
    };
    const categoriesForPost = () => {
        getToken().then((token) => fetch("/api/post/category", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => res.json()).then(setCategories)
        );
    };
    return (
        <PostContext.Provider value={{ posts, setPost, post, categories, getAllPosts, addPost, getAllSearch, getPost, getAllPostsByUser, editPost, softDeletePost, categoriesForPost, getAllPostsByUserId, recommendedPosts, setRecommendedPosts, complete, setPosts, userPosts }}>
            {props.children}
        </PostContext.Provider>
    );


}