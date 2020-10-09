import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryUpdateForm() {
    const history = useHistory();
    const { getSingleCategory, updateCategory, category } = useContext(CategoryContext);
    const [categoryText, setCategoryText] = useState();
    const { id } = useParams();

    const handleCategoryFieldChange = evt => {
        console.log("what is the evt", evt)
        const stateToChange = { ...categoryText };
        console.log("stateToChange category", stateToChange);
        stateToChange[evt.target.id] = evt.target.value;
        setCategoryText(stateToChange);

    };

    const submitForm = (e) => {
        e.preventDefault();
        //return id from category context
        //return updated name from state of
        updateCategory({ id: category.id, name: categoryText.name })
            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };

    const cancelSubmit = () => {
        history.push("/category")
    };
    useEffect(() => {
        getSingleCategory(1);
        //setCategoryText(category.name)
        //setCategoryText(CategoryContext.category);
        // .then((resp) => setCategoryText(category.name));
    }, [getSingleCategory, id]);


    return (
        <Form onSubmit={submitForm}>
            <FormGroup>
                <Label for="name">Category</Label>
                <Input id="name" type="textarea" defaultValue={category.name} maxLength="50" onChange={handleCategoryFieldChange} />
            </FormGroup>
            { categoryText ?
                <FormGroup>
                    <Button type="submit">Save</Button>
                </FormGroup>
                :
                <FormGroup>
                    <Button type="button" onClick={cancelSubmit}>Cancel</Button>
                </FormGroup>

            }
        </Form>
    );
}