import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TagProvider } from "./providers/TagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';


//object undefined error on browser if you do not include the provider in App.js
function App() {

  return (

    <Router>
      <UserProfileProvider>
        <PostProvider>
          <TagProvider>
            <CategoryProvider>
              <CommentProvider>
                <SubscriptionProvider>
                  <Header />
                  <ApplicationViews />
                </SubscriptionProvider>
              </CommentProvider>
            </CategoryProvider>
          </TagProvider>
        </PostProvider>
      </UserProfileProvider>
    </Router>


  );
}

export default App;
