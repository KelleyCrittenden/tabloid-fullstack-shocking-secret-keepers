import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryUpdateForm() {
    const history = useHistory();
    const { getSingleCategory, updateCategory, category } = useContext(CategoryContext);
    const [categoryText, setCategoryText] = useState({});
    const { id } = useParams();

    const handleCategoryFieldChange = evt => {

        console.log("what is the evt", evt)
        const stateToChange = { ...categoryText };
        console.log("stateToChange category", stateToChange);
        console.log("EVT ID", evt.target.id)
        console.log("EVT Value", evt.target.value)
        stateToChange[evt.target.id] = evt.target.value;
        setCategoryText(stateToChange);

    };

    const submitForm = (e) => {
        e.preventDefault();
        //return id from category context
        //return updated name from state of
        //updateCategory({ id: category.id, name: categoryText.name })
        updateCategory(categoryText)

            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    const cancelSubmit = () => {
        history.push("/category")
    };
    useEffect(() => {
        getSingleCategory(id);
        //having getSingleCategory inside square brakets below causes the state to be overwritten right after state is set..
    }, [id]);

    useEffect(() => {
        setCategoryText(category);
    }, [category]);

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={submitForm}>
                <FormGroup sm="9">
                    <Label for="name"><strong>Edit Category</strong></Label>
                    <Input id="name" type="textarea" defaultValue={categoryText.name} maxLength="50" onChange={handleCategoryFieldChange} />
                </FormGroup>

                <FormGroup>
                    < Button type="submit">Save</Button>
                    <Button type="button" onClick={cancelSubmit}>Cancel</Button>
                </FormGroup>

            </Form>
        </Col>
    );
}