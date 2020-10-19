import React, { useContext, useEffect, useState } from "react";
import { ReactionContext } from "../../providers/ReactionProvider";
import { Button, Col, Row, Collapse } from "reactstrap";
import AddPostReaction from "./AddPostReaction";
export default function AddPostReactionList() {

    const { allReactionTypes, getAllReactions } = useContext(ReactionContext);
    const [isOpen, setIsOpen] = useState(false);

    //set state of collapse element to the oposite of what its current state is
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        getAllReactions();
    }, []);

    return (
        <Col sm="12" md={{ size: 9, offset: 0 }}>
            {/* button to control the collapse item */}
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Add Reaction</Button>
            <Collapse isOpen={isOpen}>
                <Row>
                    {allReactionTypes.map(r =>
                        <AddPostReaction key={r.id} reaction={r} />
                    )}
                </Row>
            </Collapse>
        </Col>
    );
}