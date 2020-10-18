import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";
import { useHistory } from "react-router-dom";

import { Link, NavLink, useParams } from "react-router-dom";
import PostReactionList from "../Reaction/PostReactionList";
import { ReactionContext } from "../../providers/ReactionProvider";

const PostDetails = () => {

    const { postReactions, getAllReactionsForPost } = useContext(ReactionContext);
    const { getPost, post } = useContext(PostContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPost(id);
        getAllReactionsForPost(id);
    }, []);
    const calculateReadTime = () => {
        let time = 0;
        let test = 0;
        if (post.content != undefined) {
            test = post.content.split(" ").length;
        }

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
                    <h3 className="text-left px-2">Posted by: <strong>{post.userProfile.displayName}</strong></h3>

                </Row>
                <Row margin="m-4">
                    <Col sm="6">
                        <h1>{post.title}</h1>
                    </Col>

                    <Col sm="6">
                        <h3>{post.category.name}</h3>
                    </Col>
                </Row>
                <Row margin="m-4">
                    <Col sm="6">
                        <h3>{post.publishDateTime}</h3>
                    </Col>
                    <Col sm="6">
                        <h3>Estimated Read Time: <strong>{calculateReadTime()}{calculateReadTime() == 1 ? " min" : " mins"}</strong></h3>
                    </Col>
                </Row>
                <CardBody>
                    <CardImg className="postDetailImg" top src={post.imageLocation} alt={post.title} />
                    <p>{post.content}</p>
                </CardBody>
                <Row>
                    {postReactions.length != 0 ? (
                        <PostReactionList key={post.id} />)
                        : null}
                </Row>
            </Card>
        </>

    );
};

export default PostDetails;