import React from "react";
import { Card, CardImg, CardBody, Row } from "reactstrap";

import { NavLink } from "react-router-dom";

const Post = ({ post }) => {
    return (

        <Card className="m-4">
            <Row margin="m-4">
                <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                <NavLink to={`/post/details/${post.id}`} >
                    <strong>{post.title}</strong>

                </NavLink>

                <p>{post.category.name}</p>
            </Row>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>



            </CardBody>
        </Card>

    );
};

export default Post;