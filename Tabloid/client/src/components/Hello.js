import React, { useContext, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
//
import { SubscriptionContext } from "../providers/SubscriptionProvider";
import SubscribedPost from "../components/Subscription/SubscribedPost";



export default function Hello() {
  const { activeUser } = useContext(UserProfileContext);


  const { allSubscribedPosts, getAllSubscribedPostsForUser } = useContext(SubscriptionContext);

  useEffect(() => {
    getAllSubscribedPostsForUser(parseInt(activeUser.id))
  }, [])



  let time = new Date();
  if (time.getHours() < 12) {
    return (
      <div style={{
        position: "relative",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Morning {activeUser.displayName}
        <h5> Your Subscribed Posts</h5>
        {allSubscribedPosts.length === 0 ? <p>*You are not currently subscribed to any posts*</p> :
          allSubscribedPosts.map(subscribedPost => {
            return <SubscribedPost key={subscribedPost.id} subscribedPost={subscribedPost} />
          })}

      </div>

    );
  }
  else if ((time.getHours() < 18 && time.getHours() >= 12)) {
    return (
      <div style={{
        position: "relative",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Afternoon {activeUser.displayName}

        <h5> Your Subscribed Posts</h5>
        {allSubscribedPosts.length === 0 ? <p>*You are not currently subscribed to any posts*</p> : allSubscribedPosts.map(subscribedPost => {
          return <SubscribedPost key={subscribedPost.id} subscribedPost={subscribedPost} />
        })}

      </div>
    );
  }
  else {
    return (
      <div style={{
        position: "relative",
        left: 0,
        right: 0,
        top: "50%",
        marginTop: "-0.5rem",
        textAlign: "center",
      }}>Hello, Good Evening {activeUser.displayName}

        <h5> Your Subscribed Posts</h5>

        {allSubscribedPosts.length === 0 ? <p>*You are not currently subscribed to any posts*</p> : allSubscribedPosts.map(subscribedPost => {
          return <SubscribedPost key={subscribedPost.id} subscribedPost={subscribedPost} />
        })}

      </div>
    );

  }

}