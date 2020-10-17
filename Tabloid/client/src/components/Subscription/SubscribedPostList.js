// import React, { useContext, useEffect } from "react";
// import { SubscriptionContext } from "../providers/SubscriptionProvider";
// import SubscribedPost from "./SubscribedPost";



// const SubscribedPostList = () => {
//     let userId = sessionStorage.userProfileId
//     const { allSubsribedPosts, getAllSubscribedPostsForUser } = useContext(SubscriptionContext);

//     useEffect(() => {
//         getAllSubscribedPostsForUser(parseInt(userId))
//     })


//     return (
//         allSubsribedPosts.map(subscribedPost => {
//             return <SubscribedPost key={subscribedPost.id} subscribedPost={subscribedPost} />
//         })

//     )


// }
// export default SubscribedPostList;


