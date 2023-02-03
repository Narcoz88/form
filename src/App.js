import React from "react";
import './App.css';
import FormComp from "./components/FormComp/index.jsx";
import Table from "./components/Table";

function App() {
  return (
    <div className="App">
        <FormComp/>
        <p>result table</p>
        <Table/>
    </div>
  );
}

export default App;
