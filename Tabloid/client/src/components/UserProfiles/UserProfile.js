import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg } from "reactstrap";

export default function UserProfile({ userProfile }) {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <Col>
            <Card body>
                <Row>
                    <Col sm="7">

                        <p> Username: <strong>{userProfile.displayName}</strong></p>
                        <p>Real Life Name:<strong> {userProfile.fullName}</strong></p>
                        <p>User Status:<strong> {userProfile.userType.name}</strong></p>
                    </Col>
                    <Col>
                        <CardImg top className="UserProfileAvatar" src={userProfile.imageLocation} alt={userProfile.displayName} />

                    </Col>
                    <Col >
                        <Button type="button" id={userProfile.id} href={`/userProfile/details/${userProfile.id}`}>Details</Button>
                    </Col>


                </Row>
            </Card >
        </Col >
    );
}