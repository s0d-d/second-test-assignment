import React from "react";
import DiscussionList from "./components/DiscussionList";
import Navbar from "./components/Navbar";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <DiscussionList />
      </div>
    </>
  );
};

export default App;
