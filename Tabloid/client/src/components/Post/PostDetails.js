import React, { useContext, useEffect, useState } from "react";
import { PostContext, PostProvider } from "../../providers/PostProvider";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";
import { Card, CardImg, CardBody, Row, Button, Col, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

import { Link, NavLink, useParams } from "react-router-dom";


const PostDetails = () => {

    let userId = sessionStorage.userProfileId
    const { getPost, post } = useContext(PostContext);
    //using subscription context for posting of new subscription
    const { addSubscription, subscription, getSubscriptionByUserId } = useContext(SubscriptionContext);
    console.log(subscription);
    //setting new subscription object into state
    const [newSubscription, setNewSubscription] = useState({
        subscriberUserProfileId: parseInt(userId)
    })
    console.log(newSubscription)

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPost(id);
        getSubscriptionByUserId(userId);
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

    //subscribe to author 
    const subscribeToAuthor = () => {
        newSubscription.providerUserProfileId = post.userProfileId;
        newSubscription.endDateTime = new Date().toISOString();
        addSubscription(newSubscription);

    }

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])

    return (
        <>
            {(userId === post.userProfileId || subscription.isSubscribed === 1) ? null :
                <Button onClick={subscribeToAuthor}>Subscribe to this Author</Button>
            }
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
        </>

    );
};

export default PostDetails;