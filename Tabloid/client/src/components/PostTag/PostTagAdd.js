import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider"
import { useHistory, useParams } from "react-router-dom";
import { ListGroup, Button, ListGroupItem } from "reactstrap"
import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";

export default function AddPostTag() {
    const history = useHistory();
    const { id } = useParams();
    const { tags, getAllTags } = useContext(TagContext);
    console.log(tags, "grabbing tags")
    const { addPostTag } = useContext(PostTagContext);
    const { post } = useContext(PostContext)

    const [newPostTag, setNewPostTag] = useState({
        postId: parseInt(id),
        tagId: "",
    });

    const createPostTag = (e) => {
        e.preventDefault();
        newPostTag.tagId = parseInt(e.target.id)
        addPostTag(newPostTag)
        history.push(`/post/details/${post.id}`)
    };

    // const handleFieldChange = e => {
    //     const stateToChange = { ...newPostTag };
    //     stateToChange[e.target.id] = e.target.value;
    //     setNewPostTag(stateToChange)
    // };

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
                {tags.map(tag =>

                    <ListGroupItem key={tag.id}> {tag.name}
                        <Button id={tag.id} onClick={createPostTag}>Add Tag</Button>
                    </ListGroupItem>)}
            </ListGroup>

            <Button onClick={Cancel}>Cancel</Button>
        </>
    );
}