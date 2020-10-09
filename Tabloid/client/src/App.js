import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';


//object undefined error on browser if you do not include the provider in App.js
function App() {
  return (

    <Router>
      <UserProfileProvider>
        <PostProvider>
          <CategoryProvider>
            <CommentProvider>
              <Header />
              <ApplicationViews />
            </CommentProvider>
          </CategoryProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;
