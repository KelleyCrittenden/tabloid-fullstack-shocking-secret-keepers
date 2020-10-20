import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Form, FormGroup, Label, Input, Button, ListGroupItemText, Col } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";


const UserProfileEdit = () => {


    const { getUserProfileById, singleUserProfile, getAllUserTypes, allUserTypes, editUserProfileType, activeUser, setUserTypeId, logout, getAllAdminUserProfiles, adminProfiles } = useContext(UserProfileContext);

    const [userProfile, setUserProfile] = useState({})
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        getAllUserTypes();
        getUserProfileById(id);
        getAllAdminUserProfiles();
    }, [])
    useEffect(() => {
        setUserProfile(singleUserProfile)


    }, [singleUserProfile])


    const handleNewPost = (event) => {
        event.preventDefault();


        if (adminProfiles.length <= 1 && userProfile.userTypeId == 2) {
            window.alert("Please make another user an admin before changing this user's user type.")
        } else if (adminProfiles.length <= 1 && userProfile.userTypeId == 1) {
            editUserProfileType(userProfile.id, userProfile);


            history.push("/userProfile");
        } else {
            editUserProfileType(userProfile.id, userProfile);


            history.push("/userProfile");
        }



    }
    const handleFieldChange = (event) => {

        const stateToChange = { ...userProfile };
        stateToChange[event.target.id] = parseInt(event.target.value);
        setUserProfile(stateToChange)




    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>

            <Form>
                <FormGroup>
                    <Label className="UserTypeLabel">
                        User Types
          </Label>
                    {allUserTypes != undefined ?
                        <select
                            className="userProfile"
                            onChange={handleFieldChange}

                            id="userTypeId"

                        >
                            <option key={0} value={2}>Choose a User Type</option>
                            {allUserTypes.map(type => {

                                return <option key={type.id} value={type.id}>{type.name}</option>
                            })}

                        </select> : null
                    }
                </FormGroup>


                <Button
                    className="postButton"
                    onClick={handleNewPost}
                    variant="custom"
                    type="submit"
                >
                    Save Changes
        </Button>
                <Button type="button" id="backButton" href={`/userProfile`}>Back</Button>
            </Form>
        </Col>
    )
}
export default UserProfileEdit


