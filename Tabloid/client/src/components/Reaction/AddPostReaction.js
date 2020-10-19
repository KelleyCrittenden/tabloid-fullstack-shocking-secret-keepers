import React, { useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Card, Button, Col, Row, CardImg } from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function AddPostReaction({ reaction }) {
    const { activeUser } = useContext(UserProfileContext);
    const { addPostReaction, getAllReactionsForPost } = useContext(ReactionContext);

    const { id } = useParams();
    const history = useHistory();

    const handleAddPostReaction = (e) => {
        debugger
        e.preventDefault();
        addPostReaction({
            postId: parseInt(id),
            reactionId: reaction.id,
            userProfileId: activeUser.id
        })
            .then(() => getAllReactionsForPost(id))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };
    return (
        <Col>



            <CardImg type="button" top className="border-button" id={reaction.id} src={reaction.imageLocation} alt={reaction.name} onClick={e => handleAddPostReaction(e)} />

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


        </Col >
    );
}