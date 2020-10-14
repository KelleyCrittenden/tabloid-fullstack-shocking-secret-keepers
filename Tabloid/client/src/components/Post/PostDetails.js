import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { Card, CardImg, CardBody, Row, Button, Col, ListGroup } from "reactstrap";
import { useHistory } from "react-router-dom";
import PostTag from "../PostTag/PostTag";
import { Link, NavLink, useParams } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider";
import AddPostTag from "../PostTag/PostTagAdd";

const PostDetails = () => {

    const { getPost, post } = useContext(PostContext);
    const { id } = useParams();
    const history = useHistory();
    const { postTags, getAllPostTagsByPost } = useContext(PostTagContext);

    useEffect(() => {
        getPost(id);

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

    useEffect(() => {
        getAllPostTagsByPost(id);
    }, [id]);

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

            </Card>

            <h4>Tags: </h4>
            { (postTags.length > 0) ?
                <ListGroup>
                    {

                        postTags.map(postTag => {
                            return <PostTag key={postTag.id} postTag={postTag} />
                        }
                        )
                    }
                    <Link to={`/posttag/add/${id}`}>
                        <Button type="button" id="addPostTagButton" >Add Tag</Button>
                    </Link>


                </ListGroup>

                :

                null

            }

        </>

    );
};

export default PostDetails;