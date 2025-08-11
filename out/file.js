"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchDirectory = exports.getFile = exports.readFile = exports.isFileExist = void 0;
const fs_1 = require("fs");
const isFileExist = async (filePath) => {
    try {
        await fs_1.promises.access(filePath);
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.isFileExist = isFileExist;
const readFile = async (filePath) => {
    try {
        const data = await fs_1.promises.readFile(filePath, { encoding: "utf8" });
        return data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
};
exports.readFile = readFile;
const getFile = async (filePath, fileName) => {
    const fileExist = await (0, exports.isFileExist)(filePath);
    if (!fileExist) {
        console.error(`File ${filePath} does not exist.`);
        return null;
    }
    const content = await (0, exports.readFile)(filePath);
    if (content === null) {
        console.error(`Failed to read file ${filePath}.`);
        return null;
    }
    return new File([content], fileName);
};
exports.getFile = getFile;
const watchDirectory = (filePath, onChange) => {
    const watcher = (0, fs_1.watch)(filePath, { recursive: true }, (eventType, filename) => {
        if (!filename) {
            return;
        }
        if (eventType === "change") {
            onChange("change", `${filePath}/${filename}`);
        }
        else if (eventType === "rename") {
            onChange("add", `${filePath}/${filename}`);
        }
    });
    return () => watcher.close();
};
exports.watchDirectory = watchDirectory;
//# sourceMappingURL=file.js.map