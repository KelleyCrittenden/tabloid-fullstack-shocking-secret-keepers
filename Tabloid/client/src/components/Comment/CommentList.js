import React, { useContext, useEffect } from "react";
import { CommentContext } from "../providers/PostProvider";
import Comment from "./Comment";

const CommentList = () => {
    const { comments, getAllCommentsForPost } = useContext(CommentContext);

    useEffect(() => {
        getAllCommentsForPost();
    }, []);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {comments.map((comment) => {
                            return <Comment key={comment.id} comment={comment} />
                        })}

                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentList;