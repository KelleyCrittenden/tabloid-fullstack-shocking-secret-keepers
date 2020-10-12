import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Row, Col } from 'reactstrap';
import { CategoryContext } from "../../providers/CategoryProvider";

export default function CategoryDelete() {
    const history = useHistory();
    const { getSingleCategory, category, deleteCategory } = useContext(CategoryContext);
    const [categoryText, setCategoryText] = useState({});
    const { id } = useParams();


    const handleDelete = (e) => {
        e.preventDefault();
        //return id from category context
        //return updated name from state of
        //updateCategory({ id: category.id, name: categoryText.name })
        deleteCategory(categoryText)

            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
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
            <h3 >Delete Category: <strong>{category.name}</strong></h3>

            <Card body>
                <Row>
                    <Col sm="9">
                        <strong>Are you sure you want to Delete  "{category.name}" ?</strong>
                        <p>Any Post using Category <i>"{category.name}"</i> will change to <strong>"other"</strong></p>
                    </Col>
                    <Col sm="1">

                        <Button type="button" id={category.id} href={`/category`}>Cancel</Button>
                    </Col>
                    <Col sm="1">
                        <Button type="submit" color="danger" id={category.id} onClick={handleDelete}>Delete</Button>

                    </Col>
                </Row>
            </Card >
        </Col >
    );
}