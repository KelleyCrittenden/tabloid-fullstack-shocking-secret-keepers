import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, CardImg, CardBody } from "reactstrap";

const Comment = ({ comment }) => {

    return (
        <Card className="m-4">
            <p className="text-left px-2">{comment.post.title}
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
        </Card>
    );
};

export default Comment;