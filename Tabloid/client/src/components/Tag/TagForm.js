import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function TagForm() {
    const { addTag } = useContext(TagContext);
    const [tag, setTag] = useState({ Name: "" })

    const history = useHistory();

    const newTag = (e) => {
        e.preventDefault();
        addTag(tag);

        history.push("/tag");
    }

    const handleFieldChange = e => {
        const stateToChange = { ...tag };
        stateToChange[e.target.id] = e.target.value;
        setTag(stateToChange)
    };

    return (
        <Form>
            <FormGroup>
                <Label for="name">Add New Tag: </Label>
                <Input
                    id="name"
                    type="text"
                    onChange={handleFieldChange} />
            </FormGroup>
            <FormGroup>
                <Button onClick={newTag}>Save</Button>
            </FormGroup>
        </Form>
    );
}
