import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Button } from "reactstrap";

const CommentDetails = () => {
    const history = useHistory();
    const { id } = useParams();
    const { comment, getCommentById } = useContext(CommentContext);

    useEffect(() => {
        getCommentById(id);
    }, [])

    return (
        <>
            <h3>Your Edited Comment</h3>
            <h6>Subject</h6>
            <p>{comment && comment.subject}</p>
            <h6>Comment</h6>
            <p>{comment && comment.content}</p>
            <Button onClick={() => history.push(`/commentsbypost/${comment.postId}`)}>
                Back To Comments List
            </Button>
        </>

    )
}

export default CommentDetails;
