import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider"

const AddComment = () => {
    const userId = sessionStorage.getItem("userProfileId");
    const { id } = useParams();
    const history = useHistory();
    const { addComment, getAllCommentsForPost } = useContext(CommentContext);
    const [isLoading, setIsLoading] = useState(false)

    //hard coding postId for now; need to use id from useparams as postId;
    const [newComment, setNewComment] = useState({
        postId: 1,
        userProfileId: userId,
        subject: "",
        content: "",
        createDateTime: Date.now()
    })

    //handling input field for posting new comment
    const handleFieldChange = (e) => {
        const stateToChange = { ...newComment };
        stateToChange[e.target.id] = e.target.value;
        setNewComment(stateToChange);
    };

    //add new comment function
    const addNewComment = () => {
        setIsLoading(true);
        addComment(newComment).then(() => getAllCommentsForPost());
        setIsLoading(false);
        history.push(`/comments/commentsbypost/${id}`)

    }


    return (
        <div></div>
    )


};

export default AddComment;
