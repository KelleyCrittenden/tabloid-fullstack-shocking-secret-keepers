import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { CategoryProvider } from "./providers/CategoryProvider";

import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <CategoryProvider>
          <Header />
          <ApplicationViews />
        </CategoryProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
