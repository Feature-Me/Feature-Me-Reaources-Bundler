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
const fs_1 = __importDefault(require("fs"));
const jszip_1 = __importDefault(require("jszip"));
function createMusicPack(pathName, file) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const zip = new jszip_1.default();
        for (const filename of file) {
            const name = path_1.default.join(pathName, filename);
            const dir = (yield promises_1.default.stat(name)).isDirectory();
            if (dir) {
                const tree = getAllFile(name);
                addFolderToZip(filename, tree, zip);
            }
            else
                zip.file(filename, yield promises_1.default.readFile(name));
        }
        resolve(zip);
    }));
}
exports.default = createMusicPack;
function getAllFile(dir) {
    let fileTree = {};
    const files = fs_1.default.readdirSync(dir);
    for (const file of files) {
        const filename = path_1.default.join(dir, file);
        const isdirectory = fs_1.default.statSync(filename).isDirectory();
        if (isdirectory)
            fileTree[file] = getAllFile(filename);
        else
            fileTree[file] = fs_1.default.readFileSync(filename);
    }
    return fileTree;
}
function addFolderToZip(dir, tree, zip) {
    for (const name in tree) {
        if (Object.prototype.hasOwnProperty.call(tree, name)) {
            if (tree[name] instanceof Buffer)
                zip.file(path_1.default.join(dir, name), tree[name]);
            else
                addFolderToZip(path_1.default.join(dir, name), tree[name], zip);
        }
    }
    return zip;
}
