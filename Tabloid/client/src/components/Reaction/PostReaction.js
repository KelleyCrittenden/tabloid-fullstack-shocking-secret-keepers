import React from "react";
import { Col, CardImg } from "reactstrap";

export default function PostReaction({ postReaction }) {
    return (
        <Col>

            <CardImg top src={postReaction.reaction.imageLocation} className="PostReactionImg" />

            <span>{postReaction.reaction.reactionCount}</span>

        </ Col>
    );
}