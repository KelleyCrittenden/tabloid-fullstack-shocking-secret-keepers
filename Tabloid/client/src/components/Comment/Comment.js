import React from "react";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "./helperFunctions";
import { Card, CardBody, Button } from "reactstrap";

const Comment = ({ comment }) => {
    const history = useHistory();

    return (
        <Card className="m-4">
            <p className="text-left px-2">
                {currentDateTime(comment.createDateTime)}
                <br></br>
                Written by: {comment.userProfile.displayName}
            </p>

            <CardBody>
                <h6>Subject</h6>
                <p>{comment.subject}</p>
                <h6>Comment</h6>
                <p>{comment.content}</p>
            </CardBody>
            <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
            <Button onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>
        </Card >
    );
};

export default Comment;