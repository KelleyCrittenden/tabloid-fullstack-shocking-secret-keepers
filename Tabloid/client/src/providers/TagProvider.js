import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = createContext();


export const TagProvider = (props) => {
    const { tag, setTag } = useState({});
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
            fetch(("/api/tag"), {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            }).then(getAllTags)
        );

    const getTagById = (id) => {
        return getToken().then((token) => {
            fetch((`/api/tag/${id}`), {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => res.json()).then(setTag)
        })
    };


    const updateTag = (tag) => {
        return getToken().then((token) => {
            fetch((`/api/tag/${tag.id}`), {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tag),
            })
        });
    }


    return (
        <TagContext.Provider value={{ tag, tags, getAllTags, addTag, getTagById, updateTag }}>
            {props.children}
        </TagContext.Provider>
    );
};