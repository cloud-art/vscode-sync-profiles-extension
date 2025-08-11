import { normalize, resolve } from "path";
import * as vscode from "vscode";

export const getVSCodePath = (state: vscode.ExtensionContext) => {
  const uri = state.globalStorageUri;
  return resolve(uri.fsPath, "../../..").concat(normalize("/"));
};

export const getUserPath = (state: vscode.ExtensionContext) => {
  const VSCodePath = getVSCodePath(state);
  return resolve(VSCodePath, "User").concat(normalize("/"));
};
