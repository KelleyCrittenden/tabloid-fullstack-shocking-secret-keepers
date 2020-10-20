import React, { useEffect, useState } from "react";
import * as firebase from "firebase/app";

export const SubscriptionContext = React.createContext();

export const SubscriptionProvider = (props) => {
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [subscription, setSubscription] = useState({})
    const [allSubscribedPosts, setAllSubscribedPosts] = useState([])
    let [tertiarysubs, setTertiarySubs] = useState([])
    let [tertiarySubscribed, setTertiarySubscribed] = useState([])
    const [subComplete, setSubComplete] = useState(false)











    const getSubscriptionByUserId = (userId, authorId) => {

        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}/getby/${authorId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.status === 200) {
                    setSubscription(resp.json())
                }
                else {
                    setSubscription(null);
                }

            })
        })
    }
    const getAllTertiarySubscriptionsByUserId = (response) => {
        setSubComplete(false)


        response.map(subscription => {
            let sortedResp = []

            return getToken().then((token) => {

                fetch(`/api/subscription/tertiary/${subscription.providerUserProfileId}`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },





                }).then((resp) => resp.json()).then((resp) => {


                    for (let sub of resp) {
                        if (sub == sessionStorage.activeUserId) {

                        }
                        else {

                            sortedResp.push(sub)
                        }
                    }


                    sortedResp.map(subId => {

                        tertiarysubs.push(subId)
                        if (subId == sortedResp[sortedResp.length - 1]) {
                            if (subComplete == false) {
                                setSubComplete(true)
                            }
                            else {
                                setSubComplete(false)
                            }

                        }

                    })


                })
            })
        })

    }



    const getAllSubscriptionsByUserId = (userId) => {

        return getToken().then((token) => {
            fetch(`/api/subscription/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }).then((resp) => (resp.json())).then((resp) => (getAllTertiarySubscriptionsByUserId(resp)))




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

    const unsubscribeFromAuthor = (subscription) => {
        return getToken().then((token) => {
            fetch(`/api/subscription/${subscription.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(subscription)

            })
        })
    };

    return (

        <SubscriptionContext.Provider value={{ unsubscribeFromAuthor, allSubscribedPosts, getAllSubscribedPostsForUser, addSubscription, subscription, getSubscriptionByUserId, tertiarySubscribed, getAllSubscriptionsByUserId, tertiarysubs, subComplete, setAllSubscribedPosts, setTertiarySubs }}>
            {props.children}
        </SubscriptionContext.Provider>
    );

}
