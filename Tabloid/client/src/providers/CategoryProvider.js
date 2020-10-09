import React, { useState, createContext, useContext } from "react";

import { useHistory } from "react-router-dom";

import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export function CategoryProvider(props) {

    const history = useHistory();

    const [categories, setCategories] = useState([]);

    const [category, setCategory] = useState([]);


    const { getToken } = useContext(UserProfileContext);

    const getAllCategories = () =>
        getToken().then((token) =>
            fetch("/api/category", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));

    const getSingleCategory = (id) =>
        getToken().then((token) =>
            fetch(`/api/category/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => {
                if (resp.ok) {
                    return resp.json().then(setCategory);
                }
                history.push("/category")
                //throw new Error("Unauthorized");
            }));


    const addCategory = (category) =>
        getToken().then((token) =>
            fetch("/api/category", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

    const updateCategory = (updatedCategory) =>
        getToken().then((token) =>
            fetch(`/api/category/${updatedCategory.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedCategory)

            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));


    return (
        <CategoryContext.Provider value={{ getToken, categories, category, getAllCategories, getSingleCategory, addCategory, updateCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}



