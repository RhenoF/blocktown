import React from "react";
import "./App.css";
import Workspace from "./features/workspace/Workspace";
import Grid from "./features/grid/Grid";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>Blocktown</span>
      </header>
      <div className="Main">
        <Workspace />
        <Grid />
      </div>
    </div>
  );
}

export default App;
