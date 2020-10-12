import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryAddForm() {
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);
    const [categoryText, setCategoryText] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        addCategory({ name: categoryText })
            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };
    const cancelSubmit = () => {
        history.push("/category")
    };
    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h3>Add New Category</h3>
            <Form onSubmit={submitForm}>
                <FormGroup>
                    <Label for="categoryText"><strong>Category Name:</strong></Label>
                    <Input id="categoryText" type="textarea" maxLength="50" onChange={e => setCategoryText(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button type="submit">Save</Button>
                    <Button type="button" onClick={cancelSubmit}>Cancel</Button>
                </FormGroup>
            </Form>
        </Col >
    );
}