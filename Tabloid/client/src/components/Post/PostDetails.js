import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Row, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

import { Link, NavLink, useParams } from "react-router-dom";

const PostDetails = () => {


    const { getPost, post } = useContext(PostContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        getPost(id);
    }, []);
    const calculateReadTime = () => {
        let time = 0;
        let test = 0;
        if (post.content != undefined) {
            test = post.content.split(" ").length;
        }
        debugger
        time = test / 265;
        time = Math.ceil(time);

        return time;
    }

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])

    return (
        <>
            <Link to={`/commentsbypost/${id}`}> <Button>View Comments</Button></Link>
            <Link to={`/comments/add/${id}`}> <Button>Add Comment</Button></Link>
            <Card className="m-4">

                <Row margin="m-4">
                    <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>


                    <p>{post.title}</p>



                    <p>{post.category.name}</p>
                    <p>{post.publishdatetime}</p>
                    <p>Estimated Read Time: {calculateReadTime()}{calculateReadTime() == 1 ? " min" : " mins"}</p>
                </Row>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <p>{post.content}</p>


                </CardBody>
            </Card>
        </>

    );
};

export default PostDetails;