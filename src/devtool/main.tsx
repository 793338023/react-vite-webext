import React from "react";
import ReactDOM from "react-dom";
import browser from "webextension-polyfill";
import "../styles";
import { DevTool } from "./devTool";

ReactDOM.render(
  <React.StrictMode>
    <DevTool />
  </React.StrictMode>,
  document.getElementById("root")
);

browser.devtools.panels.create("s-test", "icon.png", "./dist/devtool/index.html");
