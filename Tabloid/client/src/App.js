import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TagProvider } from "./providers/TagProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { PostProvider } from "./providers/PostProvider";
import { ReactionProvider } from "./providers/ReactionProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';
import { PostTagProvider } from './providers/PostTagProvider';
import { SubscriptionProvider } from './providers/SubscriptionProvider';
import Post from './components/Post/Post';


//"object undefined" error on browser if you do not include the provider in App.js
function App() {

  return (

    <Router>
      <UserProfileProvider>

        <PostProvider>
          <TagProvider>
            <CategoryProvider>
              <CommentProvider>
                <ReactionProvider>
                  <SubscriptionProvider>
                    <PostTagProvider>
                      <Header />
                      <ApplicationViews />
                    </PostTagProvider>
                  </SubscriptionProvider>
                </ReactionProvider>
              </CommentProvider>
            </CategoryProvider>
          </TagProvider>
        </PostProvider>

      </UserProfileProvider>
    </Router>


  );
}

export default App;
