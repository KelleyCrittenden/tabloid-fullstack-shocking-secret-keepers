import React, { useContext } from "react";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";

import { NavLink } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const RecommendedPost = ({ post }) => {
    const { activeUser } = useContext(UserProfileContext);

    if (post.userProfileId == parseInt(sessionStorage.userProfileId)) {
        return (

            <Card className="m-4">
                <h1>Recommended</h1>
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                    </Col>
                    <Col sm="4">
                        <p><strong>{post.title}</strong></p>
                    </Col>

                    <Col sm="4">
                        <p>Category: {post.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/details/${post.id}`}><Button >Details</Button></NavLink> : <NavLink to={`details/${post.id}`}><Button >Details</Button></NavLink>}
                        </Col>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/edit/${post.id}`}><Button>Edit Post</Button></NavLink> : <NavLink to={`edit/${post.id}`}><Button>Edit Post</Button></NavLink>}
                        </Col>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/delete/${post.id}`}><Button>Delete Post</Button></NavLink> : <NavLink to={`delete/${post.id}`}><Button>Delete Post</Button></NavLink>}
                        </Col>
                    </Row>
                </CardBody>


            </Card>



        );
    } else if (activeUser.userTypeId == 1) {

        return (

            <Card className="m-4">
                <h1>Recommended</h1>
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                    </Col>
                    <Col sm="4">
                        <p><strong>{post.title}</strong></p>
                    </Col>

                    <Col sm="4">
                        <p>Category: {post.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/details/${post.id}`}><Button to={`/post/details/${post.id}`} >Details</Button></NavLink> : <NavLink to={`details/${post.id}`}><Button to={`details/${post.id}`} >Details</Button></NavLink>}
                        </Col>

                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/delete/${post.id}`}><Button>Delete Post</Button></NavLink> : <NavLink to={`delete/${post.id}`}><Button>Delete Post</Button></NavLink>}
                        </Col>
                    </Row>
                </CardBody>


            </Card>



        );
    }

    else {
        return (

            <Card className="m-4">
                <h1>Recommended</h1>
                <Row margin="m-4">
                    <Col sm="4">
                        <p className="text-left px-2">Posted by: {post.userProfile.displayName}</p>
                    </Col>

                </Row>
                <Row>
                    <Col sm="8">
                        <h2><strong>{post.title}</strong></h2>
                    </Col>

                    <Col sm="4">
                        <p>Category: {post.category.name}</p>
                    </Col>
                </Row>
                <CardImg top src={post.imageLocation} alt={post.title} />
                <CardBody>
                    <Row>
                        <Col sm="4">
                            {window.location.href == "http://localhost:3000/post" ?
                                <NavLink to={`post/details/${post.id}`}><Button to={`/post/details/${post.id}`} >Details</Button></NavLink> : <NavLink to={`details/${post.id}`}><Button to={`details/${post.id}`} >Details</Button></NavLink>}
                        </Col>

                    </Row>


                </CardBody>
            </Card>

        );
    }

};

export default RecommendedPost;