import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = createContext();

export function CategoryProvider(props) {

    const [categories, setCategories] = useState([]);

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


    return (
        <CategoryContext.Provider value={{ categories, getToken, getAllCategories, addCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
}



