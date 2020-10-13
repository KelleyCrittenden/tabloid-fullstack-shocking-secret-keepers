import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();


export const TagProvider = (props) => {

    const [tags, setTags] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const getAllTags = () =>
        getToken().then((token) => {
            fetch(("/api/tag"), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setTags);
        });

    const addTag = (tag) =>
        getToken().then((token) =>
            fetch(("api/tag"), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            })
                .then(getAllTags)
        );

    const getTag = (id) => {
        getToken().then((token) =>
            fetch((`api/tag/${id}`), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
            .then((res) => res.json())
    }

    return (
        <TagContext.Provider value={{ tags, getAllTags, addTag, getTag }}>
            {props.children}
        </TagContext.Provider>
    );
};