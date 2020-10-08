import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Tag({ tag }) {
    return (
        <Card className="m-4" >
            <CardBody>
                <strong> {tag.name} </strong>
            </CardBody>
        </Card>
    );
}           