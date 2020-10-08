import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Row } from "reactstrap";

import { NavLink, useParams } from "react-router-dom";

const PostDetails = () => {


    const { getPost, post } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {

        getPost(id);
    }, []);

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])

    return (

        <Card className="m-4">
            <Row margin="m-4">
                <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>


                <p>{post.title}</p>



                <p>{post.category.name}</p>
                <p>{post.publishdatetime}</p>
            </Row>
            <CardImg top src={post.imageLocation} alt={post.title} />
            <CardBody>
                <p>{post.content}</p>


            </CardBody>
        </Card>

    );
};

export default PostDetails;