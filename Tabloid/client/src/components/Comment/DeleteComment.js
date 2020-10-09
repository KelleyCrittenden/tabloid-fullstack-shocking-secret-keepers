import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const DeleteComment = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    //id of comment to delete
    const { id } = useParams();
    console.log(id);
    const history = useHistory();
    const { comment, deleteComment, getCommentById, getAllComments, getAllCommentsForPost } = useContext(CommentContext);
    // const [comment, setComment] = useState();
    console.log(comment);

    useEffect(() => {
        getCommentById(id);
        getAllComments();
    }, [])

    //delete comment function
    //**** need to get postId ****/
    const deleteAComment = () => {
        //need to change the id of which post, based on postId 
        //need to change 1 to dyanmic id route
        deleteComment(id).then(getAllComments()).then(history.goBack())

    }

    return (
        <>
            <h3>Are you sure you want to delete your comment ? </h3>
            <h6>Subject</h6>
            <p>{comment && comment.subject}</p>
            <h6>Comment</h6>
            <p>{comment && comment.content}</p>
            <Button className="deleteCommentButton" type="button" color="success" onClick={deleteAComment}>
                {'Delete Comment'}
            </Button>
            {/* commentsbypost/1 */}
            <Button className="returnToListButton" type="button" color="success" onClick={() => history.goBack()}>
                {'Cancel'}
            </Button>
        </>
    )


};

export default DeleteComment;