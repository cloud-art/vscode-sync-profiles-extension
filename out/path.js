"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPath = exports.getVSCodePath = void 0;
const path_1 = require("path");
const getVSCodePath = (state) => {
    const uri = state.globalStorageUri;
    return (0, path_1.resolve)(uri.fsPath, "../../..").concat((0, path_1.normalize)("/"));
};
exports.getVSCodePath = getVSCodePath;
const getUserPath = (state) => {
    const VSCodePath = (0, exports.getVSCodePath)(state);
    return (0, path_1.resolve)(VSCodePath, "User").concat((0, path_1.normalize)("/"));
};
exports.getUserPath = getUserPath;
//# sourceMappingURL=path.js.map