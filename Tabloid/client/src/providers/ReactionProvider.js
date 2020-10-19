import React, { useState } from "react";
import * as firebase from "firebase/app";

export const ReactionContext = React.createContext();

export const ReactionProvider = (props) => {

    //All Reaction Types
    const [allReactionTypes, setAllReactionTypes] = useState([]);


    //All Reactions on a post
    const [postReactions, setpostReactions] = useState([]);


    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllReactions = () => {
        return getToken().then((token) => {
            fetch("/api/reaction", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setAllReactionTypes);
        })
    };

    //Count of reaction types by postId
    const getAllReactionsForPost = (postId) => {
        return getToken().then((token) => {
            fetch(`/api/reaction/GetAllReactionsCountedByPost/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()).then(setpostReactions);
        })
    };

    const addReaction = (newReaction) => {
        return getToken().then((token) => {
            fetch("/api/reaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newReaction)
            })
        })
    };

    const addPostReaction = (newPostReaction) => {
        return getToken().then((token) => {
            fetch("/api/reaction/PostReaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(newPostReaction)
            })
        })
    };



    return (

        <ReactionContext.Provider value={{ getAllReactions, getAllReactionsForPost, addReaction, addPostReaction, allReactionTypes, postReactions }}>
            {props.children}
        </ReactionContext.Provider>
    );
}