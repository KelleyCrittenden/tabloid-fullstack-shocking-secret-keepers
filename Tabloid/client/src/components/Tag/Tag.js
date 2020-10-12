import React, { useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

export default function Tag({ tag }) {
    const history = useHistory();
    const { id } = useParams();
    const intId = parseInt(id);


    return (
        <Card className="m-4" >
            <CardBody>
                <strong> {tag.name} </strong>
                <Button color="primary" onClick={() => history.push(`/tag/edit/${tag.id}`)}>Edit</Button> &nbsp;
                <Button color="primary" onClick={"tag/delete"}>Delete</Button>
            </CardBody>
        </Card>
    );
}
