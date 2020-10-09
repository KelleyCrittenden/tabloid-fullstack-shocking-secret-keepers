import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory, useParams } from "react-router-dom";

const PostForm = () => {


    const [editedPost, setEditedPost] = useState({});
    const { categories, categoriesForPost, editPost, post, getPost, setPost } = useContext(PostContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {

        categoriesForPost();
        getPost(parseInt(id));

    }, [])

    useEffect(() => {
        setEditedPost(post)
    }, [post])
    const handleNewPost = (event) => {
        event.preventDefault();

        editedPost.categoryId = parseInt(editedPost.categoryId);

        editPost(editedPost.id, editedPost);

        history.push("/post");


    }
    const handleFieldChange = (event) => {

        const stateToChange = { ...editedPost };
        stateToChange[event.target.id] = event.target.value;
        setEditedPost(stateToChange);
        console.log(post)
        console.log(editedPost)

    }

    return (
        <Form className="postForm" onSubmit={handleNewPost}>
            <FormGroup>
                <Label className="postTitleLabel">Title</Label>
                <Input
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="title"
                    value={editedPost.title}

                    placeholder="Enter Title"
                />

            </FormGroup>
            <FormGroup>
                <Label className="ContentLabel">Content</Label>
                <textarea
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="content"
                    defaultValue={editedPost.content}

                    placeholder="Enter Content"
                />

            </FormGroup>
            <FormGroup>
                <Label className="ImageLocationLabel">Image Url</Label>
                <Input
                    className="newPost"
                    onChange={handleFieldChange}
                    type="text"
                    id="imageLocation"
                    value={editedPost.imageLocation}
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
                    id="publishDateTime"
                    value={editedPost.publishDateTime}
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
                        value={editedPost.categoryId}
                        id="categoryId"

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


