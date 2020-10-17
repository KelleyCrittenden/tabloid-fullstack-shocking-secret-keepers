import React, { useState } from "react";
import * as firebase from "firebase/app";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [subscription, setSubscription] = useState({})
    const [allSubsribedPosts, setAllSubscribedPosts] = useState([])

    const getSubscriptionByUserId = (userId, authorId) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}&${authorId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setSubscription)
        })
    };

    const getAllSubscribedPostsForUser = (userId) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/subscribedposts/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setAllSubscribedPosts);
        })
    };


    const addSubscription = (newSubscription) => {
        return getToken().then((token) => {
            fetch("/api/subscription/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newSubscription)
            })
        })
    };

    return (

        <SubscriptionContext.Provider value={{ allSubsribedPosts, getAllSubscribedPostsForUser, addSubscription, subscription, getSubscriptionByUserId }}>
            {props.children}
        </SubscriptionContext.Provider>
    );

}