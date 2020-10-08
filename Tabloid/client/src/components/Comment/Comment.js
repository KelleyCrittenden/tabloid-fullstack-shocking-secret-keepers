import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "./helperFunctions";
import { Card, CardImg, CardBody, Button } from "reactstrap";

const Comment = ({ comment }) => {
    const history = useHistory();

    return (
        <Card className="m-4">
            <p className="text-left px-2">
                {currentDateTime(comment.createDateTime)}
                <br></br>
                {/* need to get this title to commentlist or it will show up for every comment */}
                {comment.post.title}
                <br></br>
                Written by: {comment.userProfile.displayName}
            </p>

            <CardBody>
                <p>
                    {/* <Link to={`/comments/${comment.id}`}>
                        <strong>{comment.title}</strong>
                    </Link> */}
                </p>
                <p>{comment.subject}</p>
                {comment.content}

            </CardBody>
            <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
        </Card >
    );
};

export default Comment;