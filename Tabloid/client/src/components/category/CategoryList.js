import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import Category from "./Category";
import { Button, Col, Row } from "reactstrap";
export default function CategoryList() {
    const { getAllCategories, categories } = useContext(CategoryContext);
    const { activeUser } = useContext(UserProfileContext);


    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <Col sm="12" md={{ size: 6, offset: 3 }}>
            {activeUser.userTypeId === 1 &&
                <Row className="justify-content-center">
                    <Button type="button" href={`/category/add`}>Add Category</Button>
                </Row>
            }
            <section>
                {categories.map(c =>
                    (c.id !== 1) &&
                    <Category key={c.id} category={c} />
                )}
            </section>
        </Col>
    );
}