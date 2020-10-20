import React, { useState } from "react";
import * as firebase from "firebase/app";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [subscription, setSubscription] = useState({})
    const [allSubscribedPosts, setAllSubscribedPosts] = useState([])

    const getSubscriptionByUserId = (userId, authorId) => {

        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}/getby/${authorId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setSubscription)
                .catch(() => getSubscriptionByUserId())

        })
    }


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

    const unsubscribeFromAuthor = (subscriptionId, subscription) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/unsubscribe/${subscriptionId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscription)

            })
        })
    };

    const reactivateSubscription = (subscriptionId) => {

        return getToken().then((token) =>
            fetch(`/api/subscription/reactivate/${subscriptionId}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }));

    };

    const deleteSubscription = (subscriptionId) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/${subscriptionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        })
    }

    return (

        <SubscriptionContext.Provider value={{ reactivateSubscription, deleteSubscription, unsubscribeFromAuthor, allSubscribedPosts, getAllSubscribedPostsForUser, addSubscription, subscription, getSubscriptionByUserId }}>
            {props.children}
        </SubscriptionContext.Provider>
    );

}
