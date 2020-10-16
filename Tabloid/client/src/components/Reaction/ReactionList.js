import React, { useContext, useEffect } from "react";
import { ReactionContext } from "../../providers/ReactionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Reaction from "./Reaction";
import { Button, Col, Row } from "reactstrap";
export default function ReactionList() {

    const { allReactionTypes, getAllReactions } = useContext(ReactionContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllReactions();
    }, []);

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            {activeUser.userTypeId === 1 &&
                <Row className="justify-content-center">
                    <Button type="button" href={`/reaction/add`}>Add Reaction</Button>
                </Row>
            }
            <section>
                {allReactionTypes.map(r =>
                    <Reaction key={r.id} reaction={r} />
                )}
            </section>
        </Col>
    );
}