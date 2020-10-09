import React from "react";
import { Card, CardBody, Button } from "reactstrap";

export default function Category({ category }) {
    return (
        <Card>
            <CardBody>
                <strong>{category.name}</strong>
                <span >
                    <Button type="button" id={category.id} href={`/category/${category.id}`}>Edit</Button>
                </span>
            </CardBody>
        </Card >
    );
}