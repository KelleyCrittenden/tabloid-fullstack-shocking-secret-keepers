import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { CommentContext } from "../../providers/CommentProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const EditComment = () => {
    let userId = sessionStorage.userProfileId
    console.log(userId);
    //id of comment(when user clicks the editcomment button on comment )
    const { id } = useParams();
    const history = useHistory();

    const { editComment, comment, getCommentById } = useContext(CommentContext);
    console.log(comment);
    const [isLoading, setIsLoading] = useState(false);
    //represents form field state
    const [updatedComment, setUpdatedComment] = useState({})
    console.log(updatedComment);

    //getting the individual comment using params (will run after initial load of page)
    useEffect(() => {
        getCommentById(id);
    }, [])

    //handling the field change in the form to update with what user types 
    const handleEditFieldChange = (e) => {
        const stateToChange = { ...updatedComment }
        stateToChange[e.target.id] = e.target.value;
        setUpdatedComment(stateToChange)
    }

    //sets updatedComment state to value of comment; watching for changes to comment..anytime comment changes, it will trigger useEffect to update updatedComment state (ie the subject and content field values)
    //with what comment is 
    useEffect(() => {
        setUpdatedComment(comment)
    }, [comment])


    //edit comment function
    const editAComment = (e) => {
        e.preventDefault();
        setIsLoading(true);
        editComment(updatedComment);
        setIsLoading(false);
        history.push(`/comments/details/${id}`);
    }

    return (
        <>
            {updatedComment &&
                <Form>
                    <h3> Edit A Comment </h3>
                    <FormGroup>
                        <Label htmlFor="subject"><strong>Subject</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={updatedComment.subject}
                            onChange={handleEditFieldChange}
                            type="text"
                            name="subject"
                            id="subject"

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="content"><strong>Comment</strong></Label>
                        <Input className="p-2 bd-highlight justify-content-center"
                            defaultValue={updatedComment.content}
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
            <Button className="editComment" type="button" color="" isLoading={isLoading} onClick={() => history.goBack()}>
                {'Cancel'}
            </Button>



        </>
    )
};

export default EditComment;