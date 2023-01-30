"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function resolvePath(src, base) {
    if (!src)
        throw new Error("file path is empty");
    if (path_1.default.isAbsolute(src))
        return src;
    else if (base) {
        if (path_1.default.isAbsolute(base))
            return path_1.default.join(base, src);
        else
            return path_1.default.join(__dirname, base, src);
    }
    else
        return path_1.default.join(__dirname, src);
}
exports.default = resolvePath;
