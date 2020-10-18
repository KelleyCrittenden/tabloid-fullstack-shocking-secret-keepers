import React, { useContext, useEffect, useState } from "react";
import { ReactionContext } from "../../providers/ReactionProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import PostReaction from "./PostReaction";
import { Button, Col, Row } from "reactstrap";
import { useParams } from "react-router-dom";
import PostDetails from "../Post/PostDetails";
export default function PostReactionList() {

    const [reactionTypesInPost, setReactionTypesInPost] = useState([]);
    const [reactionCount, setReactionCount] = useState([]);
    const { postReactions, getAllReactionsForPost } = useContext(ReactionContext);
    const { activeUser } = useContext(UserProfileContext);
    const { id } = useParams();






    useEffect(() => {
        getAllReactionsForPost(id);
    }, []);

    let i = 0;
    let stateTypesToChange = [];
    let stateCountsToChange = [...reactionCount]

    const reactionList = () => {
        postReactions.map(reaction => {
            debugger
            console.log(reaction)
            if (stateTypesToChange.includes(reaction.reactionId)) {
                //stateCountsToChange[event.target.id] = event.target.value;
                stateTypesToChange.find((previousReaction) => previousReaction.id == reaction.id)
                {

                }

                //setReactionCount[reaction.reactionId] = { reaction };
            } else {
                let singleReaction = { id: reaction.id, postId: reaction.postId, userProfileId: reaction.userProfileId, reactionId: reaction.reactionId, reaction: { id: reaction.reaction.id, name: reaction.reaction.name, imageLocation: reaction.reaction.imageLocation } };
                debugger
                stateTypesToChange.push(singleReaction)
                // stateTypesToChange[i] = { ...stateTypesToChange[i], ...singleReaction }
                // debugger
                // i = i + 1;
                //setReactionTypesInPost({ id: reaction.id, postId: reaction.postId, userProfileId: reaction.userProfileId, reactionId: reaction.reactionId });

                console.log("singleReaction", singleReaction)
                console.log("NewTypesArray", stateTypesToChange)
            }
        })

    }

    useEffect(() => {
        reactionList()
    }, [])


    if (postReactions == "") {
        return (
            null
        )
    }

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>


            {/* <Row>
                {postReactions.map(pr =>

                    <PostReaction key={pr.id} postReaction={pr} />

                )}
            </Row> */}

        </Col>
    );
}