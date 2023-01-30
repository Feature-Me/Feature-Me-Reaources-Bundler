"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const json5_1 = __importDefault(require("json5"));
const createMusicPack_1 = __importDefault(require("./createMusicPack"));
const fileExt_1 = __importDefault(require("./fileExt"));
function startPack(pathName) {
    return new Promise((resolve, reject) => {
        promises_1.default.readdir(pathName).then((file) => {
            if (file.includes("FileMap.json")) {
                promises_1.default.readFile(path_1.default.join(pathName, "FileMap.json"), "utf-8")
                    .then(txt => json5_1.default.parse(txt))
                    .then((json) => __awaiter(this, void 0, void 0, function* () {
                    let packFunc = () => { };
                    switch (json.type) {
                        case "musicPack":
                            packFunc = createMusicPack_1.default;
                            break;
                        default:
                            break;
                    }
                    const zip = yield packFunc(pathName, file);
                    resolve([zip, fileExt_1.default[json.type] || "behavior"]);
                })).catch(reject);
            }
        }).catch(reject);
    });
}
exports.default = startPack;
