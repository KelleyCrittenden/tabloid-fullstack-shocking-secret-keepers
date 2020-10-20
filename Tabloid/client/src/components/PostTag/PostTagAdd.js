import { TagContext } from "../../providers/TagProvider";
import { PostTagContext } from "../../providers/PostTagProvider"
import { useHistory, useParams } from "react-router-dom";
import { ListGroup, Button, ListGroupItem } from "reactstrap"
import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "../../providers/PostProvider";
import PostTag from "./PostTag";

export default function AddPostTag() {
    const history = useHistory();
    const { id } = useParams();
    const { tags, getAllTags } = useContext(TagContext);
    const { addPostTag } = useContext(PostTagContext);
    const [selected, setSelected] = useState([]);

    const handleSelected = (e) => {
        const selectedTag = e.target.value
        selected.push(selectedTag);
        // debugger
        setSelected(selected);
    }

    const createPostTag = (e) => {
        e.preventDefault();
        selected.map(selectedId => {
            //creating a new postTag object
            addPostTag({
                postId: parseInt(id),
                tagId: parseInt(selectedId)
            })
        })

        history.push(`/post/details/${id}`)
    };

    useEffect(() => {
        getAllTags();
    }, []);

    const Cancel = () => {
        history.push(`/post/details/${id}`)
    }

    return (
        <>

            <div className="form-group">
                <h3>Select Tag(s) to Add</h3>
                <label className="control-label"></label>
                <select mulitple="true" className="form-control" onChange={handleSelected}>
                    <option>Choose Tag(s)...</option>
                    {tags.map(tag => {
                        return <option
                            key={tag.id}
                            value={tag.id}>
                            {tag.name}
                        </option>
                    })}

                </select>
                <span validation-for="TagsSelected" className="text-danger"></span>
            </div>
            <div>

                {/* <label for="TagSelectedList" class="control-label">Tags Currently Selected: </label> */}

                {(selected.length > 0) ?
                    <ListGroup>
                        {
                            // tags.map(tag => {
                            //     var tagId = tag.id
                            //     if (selected.includes(tagId.toString())) {
                            //         return (<p key={tagId}> {tag.name} </p>)

                        }
                    </ListGroup>
                    :
                    null}

            </div>

            <Button color="primary" onClick={createPostTag}>Add Tag(s)</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>


        </>
    );
}