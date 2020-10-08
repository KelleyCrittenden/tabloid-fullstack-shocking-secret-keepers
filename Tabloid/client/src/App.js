import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TagProvider } from "./providers/TagProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TagProvider>
          <Header />
          <ApplicationViews />
        </TagProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
