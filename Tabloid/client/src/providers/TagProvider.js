import React, { useState, createContext } from "react";

export const TagContext = createContext();

export const TagProvider = (props) => {

    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    };

    const addTag = (tag) => {
        return fetch("api/tag", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag),
        });
    };

    return (
        <TagContext.Provider value={{ tags, getAllTags, addTag }}>
            {props.children}
        </TagContext.Provider>
    );
};