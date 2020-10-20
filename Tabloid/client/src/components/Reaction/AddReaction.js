import React, { useContext, useState } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import { ReactionContext } from "../../providers/ReactionProvider";
import { useHistory } from "react-router-dom";

export default function Reaction({ reaction }) {
    const { activeUser } = useContext(UserProfileContext);
    const { addReaction } = useContext(ReactionContext);
    const [reactionName, setReactionName] = useState();
    const [reactionImageLocation, SetReactionImageLocation] = useState();
    const history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();
        addReaction({
            name: reactionName,
            ImageLocation: reactionImageLocation
        })
            .then(() => history.push("/reaction"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };
    const cancelSubmit = () => {
        history.push("/reaction")
    };
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h3>Add New Reaction</h3>
            <Form onSubmit={submitForm}>
                <FormGroup>
                    <Label for="reactionName"><strong>Reaction Name:</strong></Label>
                    <Input id="reactionName" type="text" maxLength="50" onChange={e => setReactionName(e.target.value)} />
                    <Label for="reactionImageLocation"><strong>Reaction Image URL:</strong></Label>
                    <Input id="reactionImageLocation" type="url" maxLength="255" onChange={e => SetReactionImageLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={cancelSubmit}>Cancel</Button>
                </FormGroup>
            </Form>
        </Col >
    );
}