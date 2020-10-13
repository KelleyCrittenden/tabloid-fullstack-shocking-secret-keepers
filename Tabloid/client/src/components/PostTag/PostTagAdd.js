//get all tags
//map over tag list in JSX, what about edit/delete buttons on tag card?
//use addPostTag function to add tag to current post
//add button to card to add tag to post
//Cancel button to return back to post details

import { TagProvider } from "../../providers/TagProvider";
import { PostTagProvider } from "../../providers/PostTagProvider"
import { useHistory, useParams } from "react-router-dom";
import { ListGroup, Button } from "reactstrap"
import Tag from "../Tag/Tag"
import React, { useContext, useState, useEffect } from "react";
import { PostProvider } from "../../providers/PostProvider";

export default function AddPostTag() {
    const history = useHistory();
    const { id } = useParams();
    const { tag, tags, getAllTags } = useContext(TagProvider);
    const { addPostTag } = useContext(PostTagProvider);
    const { post } = useContext(PostProvider)
    const [newPostTag, setNewPostTag] = useState({
        postId: parseInt(id),
        tagId: tag.id,
    });


    const createPostTag = (e) => {
        e.preventDefault();
        addPostTag(newPostTag)
            .then(() => history.push(`{/post/details/${post.id}`))
    };


    useEffect(() => {
        getAllTags();
    }, []);


    const Cancel = () => {
        history.push(`{/post/details/${post.id}`)
    }

    return (
        <>
            <p>Choose Tag to Add: </p>

            <ListGroup>
                {/* Map Over Tags */}
                {Tag.map(tag =>
                    (tag.id) &&
                    <Tag key={tag.id} />
                )}
                <Button onClick={createPostTag}>Add Tag</Button>
            </ListGroup>

            <Button onClick={Cancel}>Cancel</Button>
        </>
    );
}