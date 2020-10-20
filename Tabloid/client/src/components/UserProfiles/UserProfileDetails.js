import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext, UserProfileProvider } from "../../providers/UserProfileProvider";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";

import { Link, NavLink, useParams } from "react-router-dom";
import { currentDateTime } from "../Comment/helperFunctions"
const UserProfileDetails = () => {


    const { getUserProfileById, singleUserProfile } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getUserProfileById(id);
    }, []);

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])

    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>

                <Card className="m-4" >
                    <CardBody>
                        <span>
                            <CardImg top className="UserProfileAvatar" src={singleUserProfile.imageLocation} alt={singleUserProfile.displayName} />
                        </span>
                        <Row margin="m-4">
                            <h3 className="text-left px-2">Username: {singleUserProfile.displayName}</h3>
                        </Row>
                        <p>User Status: {singleUserProfile.userType.name}</p>


                        <p>Real Life Name: {singleUserProfile.fullName}</p>



                        <p>Contact: {singleUserProfile.email}</p>
                        <p>Born on Date: {currentDateTime(singleUserProfile.createDateTime)}</p>
                        <Button type="button" id="deactivateButton" href={`/userProfile/deactivation/${id}`}>Deactivate</Button>
                        <Button type="button" id="backButton" href={`/userProfile`}>Back</Button>

                    </CardBody>
                </Card>
            </Col>
        </>

    );
};

export default UserProfileDetails;