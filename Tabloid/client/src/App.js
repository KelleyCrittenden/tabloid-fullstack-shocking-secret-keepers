import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
<<<<<<< HEAD
import { TagProvider } from "./providers/TagProvider";
=======
import { PostProvider } from "./providers/PostProvider";
>>>>>>> master
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>

      <UserProfileProvider>
<<<<<<< HEAD
        <TagProvider>
          <Header />
          <ApplicationViews />
        </TagProvider>
=======
        <PostProvider>
          <Header />
          <ApplicationViews />
        </PostProvider>
>>>>>>> master
      </UserProfileProvider>
    </Router>
  );
}

export default App;
