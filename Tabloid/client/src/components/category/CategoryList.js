import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import Category from "./Category";

export default function CategoryList() {
    const { getAllCategories, categories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <section>
            {categories.map(c =>
                <Category key={c.id} category={c} />
            )}
        </section>
    );
}