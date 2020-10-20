import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
// import { currentDateTime } from "../Comment/helperFunctions";
import { Row, Col, Card, CardTitle, CardImg, CardBody, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const SubscribedPost = ({ subscribedPost }) => {


    return (

        <>
            {subscribedPost.posts && subscribedPost.posts.map(post => {
                return (
                    <Card className="m-4" key={post.id}>
                        <Row margin="m-4">
                            <Col sm="4">
                                <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                            </Col>
                            <Col sm="4">
                                <p><strong>{post.title}</strong></p>
                            </Col>

                            <Col sm="4">
                                <p>{post.category.name}</p>
                            </Col>
                        </Row>
                        <CardImg top src={post.imageLocation} alt={post.title} />
                        <CardBody>
                            <Row>
                                <Col sm="4">

                                    <NavLink to={`post/details/${post.id}`}><Button to={`post/details/${post.id}`} >Details</Button></NavLink>
                                </Col>

                            </Row>
                        </CardBody>


                    </Card>
                )


            })

            }
        </>

    )


}
export default SubscribedPost;