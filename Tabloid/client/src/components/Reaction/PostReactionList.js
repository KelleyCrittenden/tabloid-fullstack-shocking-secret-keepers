import React, { useContext, useEffect } from "react";
import { ReactionContext } from "../../providers/ReactionProvider";
import PostReaction from "./PostReaction";
import { Col, Row } from "reactstrap";
import { useParams } from "react-router-dom";
export default function PostReactionList() {


    const { postReactions, getAllReactionsForPost } = useContext(ReactionContext);

    const { id } = useParams();

    useEffect(() => {
        getAllReactionsForPost(id);
    }, []);


    if (postReactions == "") {
        return (
            null
        )
    }

    return (
        <Col sm="12" md={{ size: 5, offset: 0 }}>


            <Row>
                {postReactions.map(pr =>

                    <PostReaction key={pr.id} postReaction={pr} />

                )}
            </Row>

        </Col>
    );
}