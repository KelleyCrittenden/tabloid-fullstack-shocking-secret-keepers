import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import UserProfile from "./UserProfile";
import { Button, Col, Row } from "reactstrap";
export default function UserProfileList() {
    const { getAllUserProfiles, allUserProfiles } = useContext(UserProfileContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllUserProfiles();
    }, []);

    return (
        <>
            <Button type="button" id="reactivateButton" href={`/userProfile/reactivation`}>View Deactivated User Profiles</Button>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <section>
                    {allUserProfiles.map(u =>

                        <UserProfile key={u.id} userProfile={u} />
                    )}
                </section>
            </Col>
        </>
    );
}