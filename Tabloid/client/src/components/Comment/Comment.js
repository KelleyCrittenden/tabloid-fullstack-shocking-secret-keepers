import React from "react";
import { useHistory } from "react-router-dom";
import { currentDateTime } from "./helperFunctions";
import { Row, Col, Card, CardTitle, CardBody, Button } from "reactstrap";

const Comment = ({ comment }) => {
    let userId = sessionStorage.userProfileId
    const history = useHistory();

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
                {comment.userProfileId !== parseInt(userId) ? null :
                    <>
                        <Button onClick={() => history.push(`/comments/edit/${comment.id}`)}>Edit </Button>
                        <Button color="danger" onClick={() => history.push(`/comments/delete/${comment.id}`)}>Delete</Button>

                    </>
                }



            </Card >

        </Row>
    );
};

export default Comment;