import React, { useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../../providers/UserProfileProvider";
import { CommentContext } from "../../providers/CommentProvider"

const EditComment = (props) => {
    // const { userLoggedIn, userProfileId, getUserProfileByFirebaseId } = useContext(UserProfileContext);
    const { editComment } = useContext(CommentContext);
    // const [userProfileId, setUserProfileId] = useState();


    //current user logged in, using firebase's function to determine 
    //who is logged in set to return the firebase id;
    // const firebaseUserId = userLoggedIn();



    // getUserProfileByFirebaseId(firebaseUserId).then(res => console.log(res))



    //need to get the comment before can be edited; need to get by commentId?
    //creating comment object to be edited
    const editingComment = {

    }

    return (
        <div></div>
    )



};

export default EditComment;