import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { CommentProvider } from './providers/CommentProvider';

function App() {
  return (
    <Router>

      <UserProfileProvider>
        <CommentProvider>
          <Header />
          <ApplicationViews />
        </CommentProvider>
      </UserProfileProvider>

    </Router>
  );
}

export default App;
