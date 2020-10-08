import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentList from "./Comment/CommentList";
import AddComment from "./Comment/AddComment";

export default function ApplicationViews() {
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

        <Route path="/register">
          <Register />
        </Route>
        <Route path="/commentsbypost/:id" exact>
          <CommentList />
        </Route>
        <Route path="/comments/add/:id" exact>
          <AddComment />
        </Route>
        {/* <Route path="/comments/edit/:id" exact>
          <EditComment />
        </Route> */}
      </Switch>
    </main>
  );
};
