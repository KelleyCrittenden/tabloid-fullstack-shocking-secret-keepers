import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import CommentList from "./Comment/CommentList";
import AddComment from "./Comment/AddComment";
import DeleteComment from "./Comment/DeleteComment";
import EditComment from "./Comment/EditComment";
import CommentDetails from "./Comment/CommentDetails";
import TagList from "./Tag/TagList";
import TagForm from "./Tag/TagForm";
import TagEditForm from "./Tag/TagEditForm"
import TagDelete from "./Tag/TagDelete"
import CategoryList from "./category/CategoryList";
import CategoryAddForm from "./category/CategoryAddForm";
import CategoryUpdateForm from "./category/CategoryUpdateForm";
import CategoryDelete from "./category/CategoryDelete";
import PostList from "./Post/PostList"
import UserPostList from "./Post/UserPostList"
import PostDetails from "./Post/PostDetails";
import PostForm from "./Post/PostForm"
import PostEdit from "./Post/PostEdit"
import PostDelete from "./Post/PostDelete"
import UserProfileList from "./UserProfiles/UserProfileList";
import UserProfileDetails from "./UserProfiles/UserProfileDetails";
export default function ApplicationViews(props) {
  const { isLoggedIn, activeUser } = useContext(UserProfileContext);
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
        <Route exact path="/post/delete/:id">
          {isLoggedIn ? <PostDelete /> : <Redirect to="/login" />}
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/commentsbypost/:id" exact>
          {isLoggedIn ? <CommentList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/comments/add/:id" exact>
          {isLoggedIn ? <AddComment /> : <Redirect to="/login" />}
        </Route>
        <Route path="/comments/delete/:id" exact>
          {isLoggedIn ? <DeleteComment /> : <Redirect to="/login" />}
        </Route>
        <Route path="/comments/edit/:id" exact>
          {isLoggedIn ? <EditComment /> : <Redirect to="/login" />}
        </Route>
        <Route path="/comments/details/:id" exact>
          {isLoggedIn ? <CommentDetails /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/tag">
          {isLoggedIn && activeUser.userTypeId === 1 ? <TagList /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/tag/add">
          {isLoggedIn && activeUser.userTypeId === 1 ? <TagForm /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/tag/edit/:id">
          {isLoggedIn && activeUser.userTypeId === 1 ? <TagEditForm /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/tag/delete/:id">
          {isLoggedIn && activeUser.userTypeId === 1 ? <TagDelete /> : <Redirect to="/login" />}
        </Route>
        <Route path="/category" exact>
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/category/add" exact>
          {isLoggedIn && activeUser.userTypeId === 1 ? <CategoryAddForm /> : <Redirect to="/category" />}
        </Route>
        <Route path="/category/edit/:id" exact>
          {isLoggedIn && activeUser.userTypeId === 1 ? <CategoryUpdateForm /> : <Redirect to="/category" />}
        </Route>
        <Route path="/category/delete/:id" exact>
          {isLoggedIn && activeUser.userTypeId === 1 ? <CategoryDelete /> : <Redirect to="/category" />}
        </Route>
        <Route path="/userprofile" exact>
          {isLoggedIn && activeUser.userTypeId === 1 ? <UserProfileList /> : <Redirect to="/" />}
        </Route>
        <Route path="/userprofile/details/:id" exact>
          {isLoggedIn && activeUser.userTypeId === 1 ? <UserProfileDetails /> : <Redirect to="/userprofile" />}
        </Route>


      </Switch>
    </main >
  );
};
