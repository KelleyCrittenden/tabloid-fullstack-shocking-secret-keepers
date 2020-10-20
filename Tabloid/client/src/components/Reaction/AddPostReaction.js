import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Col, CardImg } from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";
import { useParams } from "react-router-dom";

export default function AddPostReaction({ reaction }) {
    const [isLoading, setIsLoading] = useState(false);
    const { activeUser } = useContext(UserProfileContext);
    const { addPostReaction, getAllReactionsForPost } = useContext(ReactionContext);

    const { id } = useParams();

    //create post reaction object using params, props and context
    //then get all reactions for post to rerender view
    const handleAddPostReaction = (e) => {
        setIsLoading(true);
        e.preventDefault();
        addPostReaction({
            postId: parseInt(id),
            reactionId: reaction.id,
            userProfileId: activeUser.id
        })
            .then(() => getAllReactionsForPost(id));
        setIsLoading(false);
    };

    return (
        <Col>
            {!isLoading ? (
                <CardImg type="button"
                    top className="border-button"
                    disabled={isLoading}
                    id={reaction.id}
                    src={reaction.imageLocation}
                    alt={reaction.name}
                    onClick={e => handleAddPostReaction(e)}
                />)
                : null}

        </Col >
    );
}