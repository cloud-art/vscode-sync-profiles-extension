import * as vscode from "vscode";
import { watchDirectory } from "./file";
import { getUserPath } from "./path";

export function activate(context: vscode.ExtensionContext) {
  const userPath = getUserPath(context);

  const disposableWatchingSettings = vscode.commands.registerCommand(
    "sync-profiles.watchSettings",
    () => {
      const disposeWatchDirectory = watchDirectory(
        userPath,
        (event, filePath) => {
          if (event === "add") {
            vscode.window.showInformationMessage(`File added: ${filePath}`);
          } else if (event === "change") {
            vscode.window.showInformationMessage(`File changed: ${filePath}`);
          }
        }
      );
      vscode.window.showInformationMessage("Started watching settings");

      return () => {
        disposeWatchDirectory();
        vscode.window.showInformationMessage("Stopped watching settings");
      };
    }
  );

  context.subscriptions.push(disposableWatchingSettings);
}

export function deactivate() {}
