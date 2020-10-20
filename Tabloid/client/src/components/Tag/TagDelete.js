import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom"
import React, { useEffect, useContext, useState } from "react";
import { Button, Col } from 'reactstrap'
import { TagContext } from "../../providers/TagProvider"

export default function TagDelete() {
    const history = useHistory();
    const { id } = useParams();
    const { tag, deleteTag, getTagById } = useContext(TagContext)
    const [tagName, setTagName] = useState({});

    const handleDeleteTag = (e) => {
        e.preventDefault();
        deleteTag(tagName.id)
            .then(() => history.push("/tag"))
    };

    useEffect(() => {
        getTagById(id);
    }, []);

    useEffect(() => {
        setTagName(tag);
    }, [tag]);

    const Cancel = () => {
        history.push("/tag")
    }

    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>

                {tagName &&

                    <p> Are you sure you want to Delete this tag? {tag.name} </p>

                }
                <Button id={tag.id} onClick={handleDeleteTag}>Delete</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>
            </ Col>
        </>
    )
}