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

    const { editComment, comment, getCommentById } = useContext(CommentContext);
    console.log(comment);
    const [isLoading, setIsLoading] = useState(false);
    const [updatedComment, setUpdatedComment] = useState()


    useEffect(() => {
        getCommentById(id);
    }, [])

    const handleEditFieldChange = (e) => {
        const stateToChange = { ...updatedComment }
        stateToChange[e.target.id] = e.target.value;
        setUpdatedComment(stateToChange)

    }

    useEffect(() => {
        setUpdatedComment(comment)
    }, [comment])


    //add new comment function
    const editAComment = (e) => {
        e.preventDefault();
        setIsLoading(true);
        editComment(updatedComment);
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
                            onChange={handleEditFieldChange}
                            type="text"
                            name="subject"
                            id="subject"

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="content"><strong>Comment</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={comment.content}
                            onChange={handleEditFieldChange}
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