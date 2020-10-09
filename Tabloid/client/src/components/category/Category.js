import React from "react";
import { Card, CardBody } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card>
            <CardBody>
                <strong>{category.name}</strong>
            </CardBody>
        </Card>
    );
}