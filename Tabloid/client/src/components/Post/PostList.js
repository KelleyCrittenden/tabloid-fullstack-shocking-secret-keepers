import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post";
import { Button } from "reactstrap"
import { NavLink } from "react-router-dom";
import { SubscriptionContext } from "../../providers/SubscriptionProvider";
import RecommendedPost from "./RecomenndedPost"

const PostList = () => {
    const { posts, getAllPosts, getAllPostsByUserId, recommendedPosts, setRecommendedPosts, setPosts } = useContext(PostContext);
    const { tertiarysubs, getAllSubscriptionsByUserId, subComplete, allSubscribedPosts, setAllSubscribedPosts, setTertiarySubs } = useContext(SubscriptionContext)
    const [localPosts, setLocalPosts] = useState([])
    const [localTertiarySubs, setLocalTertiarySubs] = useState([]);

    const [recPosts, setRecPosts] = useState([])
    const [finalPosts, setFinalPosts] = useState([])
    const [recComplete, setrecComplete] = useState(false)
    const [complete, setComplete] = useState(false)


    useEffect(() => {

        getAllSubscriptionsByUserId(sessionStorage.userProfileId)

    }, [])

    const addRecPosts = () => {

        for (let sub of localTertiarySubs) {


            localPosts.map(post => {
                if (sub == post.userProfileId) {
                    recommendedPosts.push(post)
                }

            })
        }
        if (recommendedPosts.length == 0) {

        } else {
            let numTest = -1;
            let numTest2 = -2;
            let aggregateFinal = []
            for (let i = 0; i < 3; i++) {

                let num = Math.floor(Math.random() * recommendedPosts.length)
                if (num == numTest || num == numTest2) {
                    i--
                } else {



                    let post = recommendedPosts[num];

                    let filterPosts = recPosts.filter(recpost => {
                        if (recpost == post) {
                            return false
                        } else {
                            return true
                        }
                    })


                    filterPosts.unshift(post)
                    aggregateFinal = filterPosts

                    numTest2 = numTest;
                    numTest = num;



                }
                if (i == 2) {

                    setrecComplete(true)

                    setFinalPosts(aggregateFinal)
                }
            }

        }
    }



    useEffect(() => {

        getAllPosts()
    }, [tertiarysubs])
    useEffect(() => {

        setLocalTertiarySubs(tertiarysubs)
        addRecPosts()
    }, [subComplete])
    useEffect(() => {

        setLocalPosts(posts)
        setRecPosts(posts)
    }, [posts])






    if (finalPosts.length != 0) {
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <NavLink to={"post/add"}><Button>New Post</Button></NavLink>
                    <div className="cards-column">
                        {finalPosts.map((post) => (
                            post == finalPosts[0] || post == finalPosts[1] || post == finalPosts[2] ? <RecommendedPost key={post.id} post={post} /> :
                                <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        );
    } else {
        return (

            <div className="container">
                <div className="row justify-content-center">
                    <NavLink to={"post/add"}><Button>New Post</Button></NavLink>
                    <div className="cards-column">
                        {posts.map((post) => (

                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }




}






    ;

export default PostList;