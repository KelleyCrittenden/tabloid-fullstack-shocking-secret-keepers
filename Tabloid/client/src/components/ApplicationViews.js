import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import PostList from "./Post/PostList"
import UserPostList from "./Post/UserPostList"
import PostDetails from "./Post/PostDetails";
import PostForm from "./Post/PostForm"
import PostEdit from "./Post/PostEdit"

export default function ApplicationViews(props) {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/post">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/post/User">
          {isLoggedIn ? <UserPostList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/post/details/:id">
          {isLoggedIn ? <PostDetails /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/post/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/post/edit/:id">
          {isLoggedIn ? <PostEdit /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
