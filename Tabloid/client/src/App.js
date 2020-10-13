import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TagProvider } from "./providers/TagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';
import { PostTagProvider } from './providers/PostTagProvider';


//object undefined error on browser if you do not include the provider in App.js
function App() {
  return (

    <Router>
      <UserProfileProvider>
        <PostProvider>
          <TagProvider>
            <CategoryProvider>
              <CommentProvider>
                <PostTagProvider>
                  <Header />
                  <ApplicationViews />
                </PostTagProvider>
              </CommentProvider>
            </CategoryProvider>
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;
