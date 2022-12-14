import React from "react";
import Routes from "./Routes";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="app-div">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
