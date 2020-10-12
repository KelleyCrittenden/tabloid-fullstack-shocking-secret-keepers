import React, { useContext } from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";
import { TagContext } from "../../providers/TagProvider";

export default function Tag({ tag }) {
    const history = useHistory();
    const { id } = useParams();
    const intId = parseInt(id);


    const Edit = () => {
        history.push(`tag/${tag.id}/edit`)
    }



    return (
        <Card className="m-4" >
            <CardBody>
                <strong> {tag.name} </strong>
                <Button color="primary" onClick={Edit}>Edit</Button> &nbsp;
                <Button color="primary" onClick={"tag/delete"}>Delete</Button>
            </CardBody>
        </Card>
    );
}
