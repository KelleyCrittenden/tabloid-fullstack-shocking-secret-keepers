import React, { useContext, useState } from "react";
import { TagContext } from "../../providers/TagProvider";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

export default function TagForm() {
    const { addTag } = useContext(TagContext);
    const [tagName, setTagName] = useState();
    const history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        addTag({ name: tagName })
            .then(() => history.push("/tag"))
    };

    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="tagName">Add New Tag: </Label>
                <Input id="tagName"
                    type="textarea"
                    onChange={e => setTagName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Button>Save</Button>
            </FormGroup>
        </Form>
    );
}
