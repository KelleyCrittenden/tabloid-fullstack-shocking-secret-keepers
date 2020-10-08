import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { CategoryContext } from "../providers/CategoryProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CategoryList from "./category/CategoryList";
import CategoryAddForm from "./category/CategoryAddForm";
import CategoryUpdateForm from "./category/CategoryUpdateForm";

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
        <Route path="/category" exact>
          <CategoryList />
        </Route>
        <Route path="/category/add" exact>
          <CategoryAddForm />
        </Route>
        <Route path="/category/:id">
          <CategoryUpdateForm />
        </Route>
      </Switch>
    </main>
  );
};
