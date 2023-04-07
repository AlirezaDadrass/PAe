import * as Mui from "@mui/material";
import React, { useEffect } from "react";
export const FormMaker = (props) => {
  for (var m in props?.model?.methods) {
    window[m] = props?.model?.methods[m];
  }
  const build = function (obj) {
    if (typeof obj === "string" || obj instanceof String) return obj;
    try {
      return obj.children
        ? Mui[obj.component]
          ? React.createElement(Mui[obj.component], obj.props, ...obj.children.map((m) => build(m)))
          : React.createElement(obj.component, obj.props, ...obj.children.map((m) => build(m)))
        : Mui[obj.component]
        ? React.createElement(Mui[obj.component], obj.props, ...obj.children.map((m) => build(m)))
        : React.createElement(obj.component, obj.props, ...obj.children.map((m) => build(m)));
    } catch (e) {
      return <></>;
    }
  };
  return <>{props?.model?.buildTree.map((m) => build(m))}</>;
};
