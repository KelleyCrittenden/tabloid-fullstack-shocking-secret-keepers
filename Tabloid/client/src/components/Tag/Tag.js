import React from "react";
import { Card, CardBody, Button } from "reactstrap";

export default function Tag({ tag }) {
    return (
        <Card className="m-4" >
            <CardBody>
                <strong> {tag.name} </strong>
                <Button color="primary" onClick={"tag/edit"}>Edit</Button> &nbsp;
                <Button color="primary" onClick={"tag/delete"}>Delete</Button>
            </CardBody>
        </Card>
    );
}           