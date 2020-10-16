import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg } from "reactstrap";

export default function Category({ reaction }) {
    const { activeUser } = useContext(UserProfileContext);

    return (
        <Col>
            <Card body>
                <Row>
                    <Col sm="9">
                        <strong>{reaction.name}</strong>
                    </Col>
                    <Col>
                        <CardImg top className="UserProfileAvatar" src={reaction.imageLocation} alt={reaction.name} />
                    </ Col>
                    {/* {activeUser.userTypeId === 1 &&
                        <>
                            <Col sm="1">
                                <Button type="button" id={category.id} href={`/category/edit/${category.id}`}>Edit</Button>
                            </Col>
                            <Col sm="1">
                                <Button type="button" color="danger" id={category.id} href={`/category/delete/${category.id}`}>Delete</Button>

                            </Col>
                        </>
                    } */}
                </Row>
            </Card >
        </Col >
    );
}