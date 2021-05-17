import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Blockly from "node-blockly/browser";
import "./App.css";
import {
  setCount,
  selectCount,
} from './features/counter/counterSlice';
import BlocklyDrawer, { Block, Category } from "react-blockly-drawer";

const helloWorld = {
  name: "HelloWorld",
  category: "Demo",
  block: {
    init: function () {
      this.jsonInit({
        message0: "Hello %1",
        args0: [
          {
            type: "field_input",
            name: "NAME",
            check: "String",
          },
        ],
        output: "String",
        colour: 160,
        tooltip: "Says Hello",
      });
    },
  },
  generator: (block) => {
    const message = `'${block.getFieldValue("NAME")}'` || "''";
    const code = `console.log('Hello ${message}')`;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
  },
};

function Content() {

  const count = useSelector(selectCount);

  return(
  <p className="row">{count}</p>
  );
}

function Drawer(props) {


  const dispatch = useDispatch();
  const workspaceChange = (code, workspace) => {
    console.log(code, workspace);
    dispatch(setCount(code))
  };


  return (
    <BlocklyDrawer
      className="row"
      tools={[helloWorld]}
      onChange={workspaceChange}
      language={Blockly.JavaScript}
      injectOptions={{
        css: true,
        scrollbars: false,
        grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
      }}
      appearance={{
        categories: {
          Demo: {
            colour: "270",
          },
        },
      }}
    >
      <Category name="Variables" custom="VARIABLE" />
      <Category name="Values">
        <Block type="controls_for" />
        <Block type="controls_if" />
        <Block type="logic_compare" />
        <Block type="math_arithmetic" />
        <Block type="math_number" />
        <Block type="text" />
      </Category>
    </BlocklyDrawer>
  );
}

function App() {
  return (
    <div className="App">
      <Drawer />
      <Content />
    </div>
  );;;
}

export default App;
