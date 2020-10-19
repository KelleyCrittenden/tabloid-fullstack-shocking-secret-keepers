import React, { useContext, useEffect, useState } from "react";
import { ReactionContext } from "../../providers/ReactionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Reaction from "./Reaction";
import { Button, Col, Row, Collapse } from "reactstrap";
import AddPostReaction from "./AddPostReaction";
export default function AddPostReactionList() {

    const { allReactionTypes, getAllReactions } = useContext(ReactionContext);
    const { activeUser } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        getAllReactions();
    }, []);

    return (
        <Col sm="12" md={{ size: 9, offset: 0 }}>

            {activeUser.userTypeId === 1 &&
                <>
                    <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Add Reaction</Button>
                    <Collapse isOpen={isOpen}>
                        <Row>
                            {allReactionTypes.map(r =>
                                <AddPostReaction key={r.id} reaction={r} />
                            )}
                        </Row>
                    </Collapse>
                </>
            }
        </Col>
    );
}