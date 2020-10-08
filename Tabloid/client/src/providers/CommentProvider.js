import React, { useState, useEffect, createContext } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);

    const getAllCommentsForPost = (postId) => {
        return fetch(`/api/comment/getallcommentsbypost/${postId}`)
            .then((res) => res.json())
            .then(setComments);
    };


    return (

        <CommentContext.Provider value={{ comments, getAllCommentsForPost }}>
            {props.children}
        </CommentContext.Provider>
    );
}