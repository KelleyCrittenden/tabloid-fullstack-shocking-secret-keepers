import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, CardImg, CardBody, Row, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "../Comment/helperFunctions"
const UserProfileReactivation = () => {

    const { getDeactivatedUsers, reactivateUserProfile, deactivatedUsers } = useContext(UserProfileContext);

    const history = useHistory();

    useEffect(() => {
        getDeactivatedUsers();
    }, []);


    const handleReactivation = (e) => {
        reactivateUserProfile(e.target.id);
        history.push("/userprofile")
    }
    return (
        <>
            <Card className="m-4" >
                {deactivatedUsers.length === 0 ? <p>There are no users currently deactivated</p> :
                    deactivatedUsers.map(deactivatedUser =>
                        <CardBody key={deactivatedUser.id}>
                            <span>
                                <CardImg top className="UserProfileAvatar" src={deactivatedUser.imageLocation} alt={deactivatedUser.displayName} />
                            </span>
                            <Row margin="m-4">
                                <h3 className="text-left px-2">Username: {deactivatedUser.displayName}</h3>
                            </Row>
                            <p>User Status: {deactivatedUser.userType.name}</p>

                            <p>Real Life Name: {deactivatedUser.fullName}</p>

                            <p>Contact: {deactivatedUser.email}</p>
                            <p>Born on Date: {currentDateTime(deactivatedUser.createDateTime)}</p>

                            <Button type="button" onClick={handleReactivation} id={deactivatedUser.id}>Reactivate</Button>
                            <Button type="button" id="backButton" href={"/userprofile"}>Back</Button>

                        </CardBody>
                    )
                }
            </Card>
        </>

    );
};

export default UserProfileReactivation;