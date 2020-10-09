import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Form, FormGroup, Label, Input, Button, Card, Row, CardImg, CardBody } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

const PostForm = () => {



    const { softDeletePost, post, getPost, setPost } = useContext(PostContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {


        getPost(parseInt(id));

    }, [])


    const handleDelete = (evt) => {
        softDeletePost(id);

        history.push("/post");
    }

    return (
        <>
            <h1>Are you sure you want to delete this post?</h1>
            <Card className="m-4">
                <Row margin="m-4">
                    <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>

                    <strong>{post.title}</strong>


                    <p>{post.category.name}</p>
                </Row>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>



                </CardBody>
            </Card>

            <Button onClick={handleDelete}>Delete</Button>
        </>
    )
}
export default PostForm


