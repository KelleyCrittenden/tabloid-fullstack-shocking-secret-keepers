import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Tag({ tag }) {
    return (
        <Card className="m-4" >
            <p className="text-left px-2"> Tag: </p>
            <CardBody>
                <strong> {tag.name} </strong>
            </CardBody>
        </Card>
    );
}           