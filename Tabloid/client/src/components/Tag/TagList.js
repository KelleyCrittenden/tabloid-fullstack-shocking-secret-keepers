import React, { useContext, useEffect } from "react";
import Tag from "./Tag";
import { TagContext } from "../../providers/TagProvider";
import { Button } from "reactstrap"

export default function TagList() {

    const { tags, getAllTags } = useContext(TagContext);

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <>
            <Button color="primary" onClick={() => { ("/tag/add") }}>
                Create Tag
            </Button>

            <section>
                {tags.map((t) => (
                    <Tag key={t.id} tag={t} />
                ))}
            </section>
        </>
    )
}