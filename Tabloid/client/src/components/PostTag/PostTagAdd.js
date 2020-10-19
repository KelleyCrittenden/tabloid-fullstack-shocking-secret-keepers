import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider"
import { useHistory, useParams } from "react-router-dom";
import { ListGroup, Button, ListGroupItem } from "reactstrap"
import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import MultiSelect from "react-multi-select-component";

export default function AddPostTag() {
    const history = useHistory();
    const { id } = useParams();
    const { tag, tags, getAllTags } = useContext(TagContext);
    const { addPostTag } = useContext(PostTagContext);
    const { post } = useContext(PostContext)
    const [selected, setSelected] = useState([]);

    const [newPostTag, setNewPostTag] = useState({
        postId: parseInt(id),
        tagId: "",
    });

    const createPostTag = (e) => {
        e.preventDefault();
        newPostTag.tagId = parseInt(e.target.id)
        addPostTag(newPostTag)
            .then(() => history.push(`/post/details/${post.id}`))
    };

    useEffect(() => {
        getAllTags();
    }, []);

    const Cancel = () => {
        history.push(`/post/details/${post.id}`)
    }

    return (
        <>

            <h1>Select Tags</h1>
            {/* showing user what has been slected  */}
            <pre>{JSON.stringify(selected)}</pre>

            <MultiSelect
                options={tags} // options to display in the dropdown
                displayValue="name"
                value={selected}
                onChange={setSelected}
                labelledBy={"Select tag(s)"}
            />
            {/* <p>Choose Tag to Add: </p>

            <ListGroup>
                {tags.map(tag =>

                    <ListGroupItem key={tag.id}> {tag.name}
                        <Button id={tag.id} onClick={createPostTag}>Add Tag</Button>
                    </ListGroupItem>)}
            </ListGroup> */}
            <Button onClick={createPostTag}>Add Tag(s)</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>

        </>
    );
}