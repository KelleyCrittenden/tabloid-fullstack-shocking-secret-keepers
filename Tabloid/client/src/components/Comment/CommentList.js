import React, { useContext, useEffect } from "react";
import { CommentContext } from "../../providers/CommentProvider";
import Comment from "./Comment";
import { Button } from "reactstrap";
//accesses the route parameters
import { Link, useParams } from "react-router-dom";


const CommentList = () => {
    const { comments, getAllCommentsForPost } = useContext(CommentContext);
    // this will be the postId (once user clicks on view comments button on post details page--takes them to this page to view comments)
    const { id } = useParams();

    useEffect(() => {
        getAllCommentsForPost(id);
    }, []);

    return (
        <>
            {/* need to use postcontext to get post.title (get post by postId?)??? */}
            {/* check this route with posts section */}
            <Link to={`/posts/detail/${id}`}>
                <Button>Back To Post</Button>
            </Link>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {comments.map((comment) => {
                            return (
                                <Comment key={comment.id} comment={comment} />
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentList;