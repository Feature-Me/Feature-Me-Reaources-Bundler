"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_line_args_1 = __importDefault(require("command-line-args"));
const args_1 = __importDefault(require("./args"));
const path_1 = __importDefault(require("path"));
const resolvePath_1 = __importDefault(require("./resolvePath"));
const promises_1 = __importDefault(require("fs/promises"));
const startPack_1 = __importDefault(require("./startPack"));
const options = (0, command_line_args_1.default)(args_1.default);
const srcPath = (0, resolvePath_1.default)(options.src, options === null || options === void 0 ? void 0 : options.basedir);
const outFilename = options.filename || path_1.default.basename(options.src);
const distPath = (0, resolvePath_1.default)(path_1.default.dirname(options.dist), options === null || options === void 0 ? void 0 : options.baseDir);
promises_1.default.access(srcPath, promises_1.default.constants.R_OK).then(run).catch(console.error);
function run() {
    console.log(`Started packing : ${srcPath}`);
    console.log(distPath, outFilename);
    (0, startPack_1.default)(srcPath).then(res => {
        const zip = res[0];
        const ext = res[1];
        zip.generateAsync({ type: "nodebuffer" }).then(buffer => {
            promises_1.default.writeFile(path_1.default.join(distPath, outFilename + ext), buffer, "binary");
        });
    });
}
