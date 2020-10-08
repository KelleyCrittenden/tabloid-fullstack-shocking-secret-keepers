import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Card, CardImg, CardBody, Button } from "reactstrap";

const Comment = ({ comment }) => {
    const history = useHistory();

    return (
        <Card className="m-4">
            <p className="text-left px-2">
                {comment.createDateTime}
                {comment.post.title}
                {/* <Link to={`/users/${comment.userProfileId}`}>
                    {comment.userProfile.name}
                </Link> */}
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