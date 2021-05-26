import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Blockly from "blockly";
import BlocklyJS from "blockly/javascript";
import styles from "./Workspace.module.css";
import custom_toolbox from "./custom_toolbox.json";
import default_workspace from "./default_workspace";
// import { acorn, JSInterpreter } from "./acorn_interpreter";
import { setCode } from "../grid/gridSlice";
import { BlocklyWorkspace } from "react-blockly";

// global.acorn = acorn;

Blockly.Blocks["hello_world"] = {
  init: function () {
    this.jsonInit({
      message0: "Hello %1",
      args0: [
        {
          type: "field_input",
          name: "NAME",
        },
      ],
      output: "String",
      colour: 160,
      tooltip: "Says Hello",
    });
  },
};
BlocklyJS["hello_world"] = function (block) {
  const message = `'${block.getFieldValue("NAME")}'` || "''";
  const code = `console.log('Hello ${message}')`;
  return [code, BlocklyJS.ORDER_MEMBER];
};

BlocklyJS.addReservedWords("code");

function Workspace(props) {
  const dispatch = useDispatch();

  // BlocklyJS.STATEMENT_PREFIX = "highlightBlock(%1);\n";
  // BlocklyJS.addReservedWords("highlightBlock");

  const workspaceChange = (workspace) => {
    const code = BlocklyJS.workspaceToCode(workspace);
    const xmlParsed = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xmlParsed);
    // var initFunc = function (interpreter, globalObject) {
    //   var wrapper = function (text) {
    //     console.log(text);
    //   };
    //   interpreter.setProperty(
    //     globalObject,
    //     "alert",
    //     interpreter.createNativeFunction(wrapper)
    //   );
    //   var wrapper2 = function (id) {
    //     return workspace.highlightBlock(id);
    //   };
    //   interpreter.setProperty(
    //     globalObject,
    //     "highlightBlock",
    //     interpreter.createNativeFunction(wrapper2)
    //   );
    // };
    // const myInterpreter = new JSInterpreter(code);
    console.log("code:", code, "workspace", xmlText);
    dispatch(setCode(code));
    // myInterpreter.run();
    // console.log("Interpreter Run", myInterpreter.value);
  };

  const useDefaults = (workspace) => {
    const toolbox = workspace.getToolbox();
    const category = toolbox.getToolboxItems()[1];
    const dom_default = Blockly.Xml.textToDom(default_workspace);
    category.updateFlyoutContents(dom_default);
  };

  const [xml, setXml] = useState(null);

  return (
    <BlocklyWorkspace
      className={styles.column} // you can use whatever classes are appropriate for your app's CSS
      workspaceConfiguration={{
        css: true,
        scrollbars: false,
        grid: { spacing: 20, length: 3, colour: "#ccc", snap: true },
        renderer: "zelos", // geras, thrasos or zelos
      }}
      onInject={useDefaults}
      toolboxConfiguration={custom_toolbox} // this must be a JSON toolbox definition
      onWorkspaceChange={workspaceChange}
      initialXml={xml}
      onXmlChange={setXml}
    />
  );
}

export default Workspace;
