import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext, UserProfileProvider } from "../../providers/UserProfileProvider";
import { Card, CardImg, CardBody, Row, Button } from "reactstrap";

import { Link, NavLink, useParams } from "react-router-dom";
import { currentDateTime } from "../Comment/helperFunctions"
const UserProfileDeactivation = () => {


    const { getUserProfileById, singleUserProfile, deactivateUserProfile } = useContext(UserProfileContext);
    const { id } = useParams();

    useEffect(() => {
        getUserProfileById(id);
    }, []);

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])
    const handleDeactivation = () => {
        deactivateUserProfile(id);

    }
    return (
        <>
            <Card className="m-4" >
                <CardBody>
                    <h2>Are you sure you want to Deactivate this User?</h2>
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
                    <Button type="button" onClick={handleDeactivation} id="deactivateButton" href={`/userProfile`}>Deactivate</Button>
                    <Button type="button" id="backButton" href={`/userProfile/:id`}>Back</Button>

                </CardBody>
            </Card>
        </>

    );
};

export default UserProfileDeactivation;