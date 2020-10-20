import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";
import { Button, Col } from "reactstrap";
import { useHistory } from 'react-router-dom'

export default function TagList() {

    const history = useHistory();
    const { tags, getAllTags } = useContext(TagContext);

    const Create = () => {
        history.push("tag/add");
    }

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Button color="primary" onClick={Create}>
                    Create Tag
            </Button>

                <section>
                    {tags.map((t) => (
                        <Tag key={t.id} tag={t} />
                    ))}
                </section>
            </Col>
        </>
    )
}