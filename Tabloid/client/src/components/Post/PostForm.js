import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const PostForm = () => {

    const [post, setPost] = useState({ Title: "", Content: "", ImageLocation: "", PublishDateTime: "", IsApproved: true, CategoryId: 0, UserProfileId: "" })
    const { categories, categoriesForPost, addPost } = useContext(PostContext);

    const history = useHistory();


    useEffect(() => {
        categoriesForPost()
    }, [])
    const handleNewPost = (event) => {
        event.preventDefault();
        debugger
        post.CategoryId = parseInt(post.CategoryId);
        post.UserProfileId = parseInt(sessionStorage.userProfileId);
        addPost(post);

        history.push("/");


    }
    const handleFieldChange = (event) => {
        const stateToChange = { ...post };
        stateToChange[event.target.id] = event.target.value;
        setPost(stateToChange);


    }

    return (
        <Form className="postForm" onSubmit={handleNewPost}>
            <FormGroup>
                <Label className="postTitleLabel">Title</Label>
                <Input
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="Title"
                    placeholder="Enter Title"
                />
            </FormGroup>
            <FormGroup>
                <Label className="ContentLabel">Content</Label>
                <textarea
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="Content"
                    placeholder="Enter Content"
                />

            </FormGroup>
            <FormGroup>
                <Label className="ImageLocationLabel">Image Url</Label>
                <Input
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="ImageLocation"
                    placeholder="Image Url"
                />
            </FormGroup>

            <FormGroup>
                <Label className="DatePublishedLabel">
                    Date Created
          </Label>
                <Input
                    className="newPost"
                    onChange={handleFieldChange}
                    type="datetime-local"
                    id="PublishDateTime"
                    placeholder=""
                />
            </FormGroup>
            <FormGroup>
                <Label className="CategoryLabel">
                    Post Categories
          </Label>
                {categories != undefined ?
                    <select
                        className="newPost"
                        onChange={handleFieldChange}

                        id="CategoryId"

                    >
                        {categories.map(category => {

                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })}

                    </select> : null
                }
            </FormGroup>


            <Button
                className="postButton"
                onClick={handleNewPost}
                variant="custom"
                type="submit"
            >
                Save Post
        </Button>
        </Form>
    )
}
export default PostForm


