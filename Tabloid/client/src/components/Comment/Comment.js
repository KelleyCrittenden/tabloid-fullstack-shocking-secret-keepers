import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "./helperFunctions";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap";
import { UserProfileContext } from "../../providers/UserProfileProvider";

const Comment = ({ comment }) => {
    let userId = sessionStorage.userProfileId
    const history = useHistory();
    const { activeUser } = useContext(UserProfileContext);

    if (comment.userProfileId == parseInt(sessionStorage.userProfileId)) {
        return (
            <Row >

                <Card className="m-2">


                    <p className="text-left px-2">
                        {currentDateTime(comment.createDateTime)}
                        <br></br>
                Written by: <strong>{comment.userProfile.displayName}</strong>
                    </p>


                    <CardBody>
                        <h6>Subject</h6>
                        <p>{comment.subject}</p>
                        <h6>Comment</h6>
                        <p>{comment.content}</p>
                    </CardBody>


                    <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
                    <Button color="danger" onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>




                </Card >

            </Row>
        );
    }
    else if (activeUser.userTypeId == 1) {
        return (
            <Row >

                <Card className="m-2">


                    <p className="text-left px-2">
                        {currentDateTime(comment.createDateTime)}
                        <br></br>
                Written by: <strong>{comment.userProfile.displayName}</strong>
                    </p>


                    <CardBody>
                        <h6>Subject</h6>
                        <p>{comment.subject}</p>
                        <h6>Comment</h6>
                        <p>{comment.content}</p>
                    </CardBody>


                    <Button color="danger" onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>






                </Card >

            </Row>
        );
    }
    else {
        return (
            <Row >

                <Card className="m-2">


                    <p className="text-left px-2">
                        {currentDateTime(comment.createDateTime)}
                        <br></br>
                Written by: <strong>{comment.userProfile.displayName}</strong>
                    </p>


                    <CardBody>
                        <h6>Subject</h6>
                        <p>{comment.subject}</p>
                        <h6>Comment</h6>
                        <p>{comment.content}</p>
                    </CardBody>




                </Card >

            </Row>
        );
    }
};

export default Comment;