import React from "react";
import { Card, CardImg, CardBody, Row, Button } from "reactstrap";

import { NavLink } from "react-router-dom";

const Post = ({ post }) => {

    if (post.userProfileId == parseInt(sessionStorage.userProfileId)) {
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
                {window.location.href == "http://localhost:3000/post" ?
                    <NavLink to={`post/edit/${post.id}`}><Button>Edit Post</Button></NavLink> : <NavLink to={`edit/${post.id}`}><Button>Edit Post</Button></NavLink>}
                {window.location.href == "http://localhost:3000/post" ?
                    <NavLink to={`post/delete/${post.id}`}><Button>Delete Post</Button></NavLink> : <NavLink to={`delete/${post.id}`}><Button>Delete Post</Button></NavLink>}
            </Card>

        );
    } else {
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
    }

};

export default Post;