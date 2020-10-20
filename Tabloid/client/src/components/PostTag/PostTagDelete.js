import { useHistory, useParams } from "react-router-dom";
import { PostTagContext } from "../../providers/PostTagProvider"
import React, { useContext, useState, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap"

export default function DeletedPostTag() {
    const history = useHistory();
    const { id } = useParams();
    const [selected, setSelected] = useState([]);
    const { deletePostTag, postTags, getAllPostTagsByPost } = useContext(PostTagContext)
    const { tag } = useContext(TagContext)

    const handleSelected = (e) => {
        const selectedPostTag = e.target.value
        selected.push(selectedPostTag);
        setSelected(selected);
    }

    const removePostTag = (e) => {
        e.preventDefault();
        selected.map(selectedId => {
            deletePostTag(selectedId)
        })
        history.push(`/post/details/${id}`)
    };

    useEffect(() => {
        getAllPostTagsByPost(id);
    }, []);

    const Cancel = () => {
        history.push(`/post/details/${id}`)
    }

    return (
        <>
            <div class="form-group">
                <h3>Select Tag(s) to Delete</h3>
                <label for="PostTagsSelected" class="control-label"></label>
                <select isMulti mulitple={true} for="PostTagsSelected" class="form-control" onChange={handleSelected}>
                    <option>Choose Tag(s)...</option>
                    {postTags.map(postTag => {
                        return <option
                            key={postTag.id}
                            value={postTag.id}>
                            {postTag.tag.name}
                        </option>
                    })}

                </select>
                <span validation-for="PostTagsSelected" class="text-danger"></span>
            </div>

            <Button color="danger" onClick={removePostTag}>Delete Tag(s)</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>

        </>
    );
}