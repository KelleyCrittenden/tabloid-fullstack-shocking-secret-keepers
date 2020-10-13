import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Card, CardBody, Button } from "reactstrap";

const DeleteComment = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    //id of comment to delete
    const { id } = useParams();
    console.log(id);
    const history = useHistory();
    const { comment, deleteComment, getCommentById } = useContext(CommentContext);
    console.log(comment);

    useEffect(() => {
        getCommentById(id);
    }, [])

    //delete comment function
    const deleteAComment = () => {
        deleteComment(id).then(history.goBack())
    }

    return (
        <>
            <Card>
                <CardBody>
                    <h3>Are you sure you want to delete your comment ? </h3>
                    <h6>Subject</h6>
                    <p>{comment && comment.subject}</p>
                    <h6>Comment</h6>
                    <p>{comment && comment.content}</p>
                </CardBody>
                <Button block className="deleteCommentButton" type="button" color="danger" onClick={deleteAComment}>
                    {'Delete Comment'}
                </Button>

                <Button block className="returnToListButton" type="button" color="success" onClick={() => history.goBack()}>
                    {'Cancel'}
                </Button>

            </Card>
        </>
    )

};

export default DeleteComment;