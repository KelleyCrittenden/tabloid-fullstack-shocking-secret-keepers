import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const EditComment = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    //id of comment(when user clicks the editcomment button on )
    const { id } = useParams();
    const history = useHistory();

    const { editComment, comment, getCommentById, getAllComments } = useContext(CommentContext);
    const [isLoading, setIsLoading] = useState(false);
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");


    useEffect(() => {
        getCommentById(id);
        getAllComments();

    }, [])

    // const [editingComment, setEditingComment] = useState({

    //     userProfileId: parseInt(userId),
    //     subject: comment.subject,
    //     content: comment.content
    // })


    //add new comment function
    const editAComment = (e) => {
        const editingComment = {
            id: comment.id,
            userProfileId: parseInt(userId),
            subject,
            content,
        }

        e.preventDefault();
        setIsLoading(true);
        editComment(editingComment).then(getAllComments())
        setIsLoading(false);
        //need to change 1 to dyanmic id route
        history.push(`/commentsbypost/1`)
    }

    return (
        <>
            {comment &&
                <Form>
                    <h3> Edit A Comment </h3>
                    <FormGroup>
                        <Label htmlFor="subject"><strong>Subject</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={comment.subject}
                            onChange={e => setSubject(e.target.value)}
                            type="text"
                            name="subject"
                            id="subject"

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="content"><strong>Comment</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={comment.content}
                            onChange={e => setContent(e.target.value)}
                            type="textarea"
                            name="content"
                            id="content"

                        />
                    </FormGroup>
                </Form >
            }
            <Button className="editComment" type="button" color="success" isLoading={isLoading} onClick={editAComment}>
                {'Save Edited Comment'}
            </Button>
            <Button className="editComment" type="button" color="success" isLoading={isLoading} onClick={() => history.goBack()}>
                {'Cancel'}
            </Button>

        </>

    )


};

export default EditComment;