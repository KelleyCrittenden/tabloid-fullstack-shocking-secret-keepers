import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
<<<<<<< HEAD
import { TagProvider } from "./providers/TagProvider";
=======
import { CategoryProvider } from "./providers/CategoryProvider";
>>>>>>> master
import { PostProvider } from "./providers/PostProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";


//object undefined error on browser if you do not include the provider in App.js
function App() {
  return (
    <Router>
      <UserProfileProvider>
        <PostProvider>
<<<<<<< HEAD
          <TagProvider>
            <Header />
            <ApplicationViews />
          </TagProvider>
=======
          <CategoryProvider >
            <Header />
            <ApplicationViews />
          </CategoryProvider>
>>>>>>> master
        </PostProvider>
      </UserProfileProvider>
    </Router >
  );
}

export default App;
