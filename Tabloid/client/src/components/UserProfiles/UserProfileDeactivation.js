import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext, UserProfileProvider } from "../../providers/UserProfileProvider";
import { Card, CardImg, CardBody, Row, Button, Col } from "reactstrap";

import { Link, NavLink, useParams, useHistory } from "react-router-dom";
import { currentDateTime } from "../Comment/helperFunctions"
const UserProfileDeactivation = () => {


    const { getUserProfileById, singleUserProfile, deactivateUserProfile, adminProfiles, getAllAdminUserProfiles } = useContext(UserProfileContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getUserProfileById(id);
        getAllAdminUserProfiles();
    }, []);

    // useEffect(() => {
    //     debugger
    //     getAllPosts();
    // }, [])
    const handleDeactivation = () => {
        if (adminProfiles.length <= 1 && singleUserProfile.userTypeId == 1) {
            window.alert("Please make another user an admin before deactivating this user.")
        } else {
            deactivateUserProfile(id);
            history.push("/userprofile");
        }
    }
    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>

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
                        <Button type="button" onClick={handleDeactivation} id="deactivateButton">Deactivate</Button>
                        <Button type="button" id="backButton" href={`/userProfile`}>Back</Button>

                    </CardBody>
                </Card>
            </Col>
        </>

    );
};

export default UserProfileDeactivation;