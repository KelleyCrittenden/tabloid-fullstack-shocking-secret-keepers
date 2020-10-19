import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Col, CardImg } from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";
import { useParams } from "react-router-dom";

export default function AddPostReaction({ reaction }) {
    const { activeUser } = useContext(UserProfileContext);
    const { addPostReaction, getAllReactionsForPost } = useContext(ReactionContext);

    const { id } = useParams();

    //create post reaction object using params, props and context
    //then get all reactions for post to rerender view
    const handleAddPostReaction = (e) => {
        e.preventDefault();
        addPostReaction({
            postId: parseInt(id),
            reactionId: reaction.id,
            userProfileId: activeUser.id
        })
            .then(() => getAllReactionsForPost(id));
    };
    return (
        <Col>

            <CardImg type="button"
                top className="border-button"
                id={reaction.id}
                src={reaction.imageLocation}
                alt={reaction.name}
                onClick={e => handleAddPostReaction(e)}
            />

        </Col >
    );
}