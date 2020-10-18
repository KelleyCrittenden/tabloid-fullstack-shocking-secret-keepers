import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg } from "reactstrap";

export default function PostReaction({ postReaction }) {
    const { activeUser } = useContext(UserProfileContext);
    console.log(postReaction, "reaction")
    return (

        <>

            <Col>
                <CardImg top src={postReaction.reaction.imageLocation} className="UserProfileAvatar" />
            </ Col>
            <Col>
                {/* Add count function  */}
            </Col>
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
        </>

    );
}