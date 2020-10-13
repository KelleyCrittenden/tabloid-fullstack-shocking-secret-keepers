import React from "react";
import { Card, CardBody } from "reactstrap";

export default function PostTag({ postTag }) {

    return (
        <Card className="m-4" >
            <CardBody>
                <strong> {postTag.tag.name} </strong>
            </CardBody>
        </Card>
    );
}