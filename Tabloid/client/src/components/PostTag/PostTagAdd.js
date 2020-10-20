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
    const { addPostTag } = useContext(PostTagContext);
    const [selected, setSelected] = useState([]);

    const handleSelected = (e) => {
        const selectedTag = e.target.value
        selected.push(selectedTag);
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

            <div class="form-group">
                <label for="TagsSelected" class="control-label">Select Tags</label>
                <select isMulti mulitple={true} for="TagsSelected" class="form-control" onChange={handleSelected}>
                    <option>Choose Tag...</option>
                    {tags.map(tag => {
                        return <option
                            key={tag.id}
                            value={tag.id}>
                            {tag.name}
                        </option>
                    })}

                </select>
                <span validation-for="TagsSelected" class="text-danger"></span>
            </div>
            {/* <div>
            
                    <label for="TagSelectedList" class="control-label">Tags Currently Selected: </label>

                    {(??????.length > 0) ?
                        <ListGroup>
                            {
                              map over selected tags
                                })
                            }
                        </ListGroup>
                        :
                        null}

            </div> */}

            <Button color="primary" onClick={createPostTag}>Add Tag(s)</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>


        </>
    );
}