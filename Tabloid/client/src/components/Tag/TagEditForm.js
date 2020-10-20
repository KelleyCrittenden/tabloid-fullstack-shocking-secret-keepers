import React, { useContext, useState, useEffect } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";


export default function TagEditForm() {
    const { id } = useParams();
    const history = useHistory();
    const { updateTag, getTagById, tag } = useContext(TagContext);
    const [tagName, setTagName] = useState({});

    useEffect(() => {
        getTagById(id);
    }, [])

    const handleFieldChange = (e) => {
        const stateToChange = { ...tagName }
        stateToChange[e.target.id] = e.target.value;
        setTagName(stateToChange);
    };

    useEffect(() => {
        setTagName(tag)
    }, [tag])

    const saveEditedTag = (e) => {
        e.preventDefault();
        updateTag(tagName)
            .then(() => history.push("/tag"))
    };

    const Cancel = () => {
        history.push("/tag")
    }

    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                {tagName &&
                    <Form>

                        <FormGroup>
                            <Label for="name">Edit Tag: </Label>
                            <Input
                                id="name"
                                defaultValue={tagName.name}
                                type="text"
                                onChange={handleFieldChange} />
                        </FormGroup>
                    </Form>
                }
                <Button onClick={saveEditedTag}>Save</Button>&nbsp;
            <Button onClick={Cancel}>Cancel</Button>
            </Col>
        </>
    );
}
