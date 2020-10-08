import React, { useState, useEffect } from "react";


export const CommentContext = React.createContext();

export const CommentProvider = (props) => {

    const [comments, setComments] = useState([]);

    const getAllCommentsForPost = (postId) => {
        return fetch(`/api/comment/getallcommentsbypost/${postId}`)
            .then((res) => res.json())
            .then(setComments);
    };

    const editComment = (comment) => {
        return fetch(`/api/comment/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(comment)
        }).then(data => data.json())
    }


    return (

        <CommentContext.Provider value={{ comments, getAllCommentsForPost, editComment }}>
            {props.children}
        </CommentContext.Provider>
    );
}