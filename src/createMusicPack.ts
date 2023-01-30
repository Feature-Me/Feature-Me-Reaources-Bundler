import path from "path";
import fs from "fs/promises";
import fsSync from "fs"
import json5 from "json5";
import JSZip from "jszip";

export default function createMusicPack(pathName: string,file:Array<string>) {
    return new Promise<JSZip>(async (resolve, reject) => {
        const zip = new JSZip();
        for (const filename of file) {
            const name = path.join(pathName, filename)
            const dir = (await fs.stat(name)).isDirectory();
            if(dir) {
                const tree = getAllFile(name);
                addFolderToZip(filename,tree,zip);
            }else zip.file(filename,await fs.readFile(name))
        }
        resolve(zip)
    })
}

function getAllFile(dir:string){
    let fileTree:{[key:string]:{}|Buffer} = {};
    const files = fsSync.readdirSync(dir);
    for (const file of files) {
        const filename = path.join(dir, file)
        const isdirectory = fsSync.statSync(filename).isDirectory();
        if(isdirectory) fileTree[file] = getAllFile(filename);
        else fileTree[file] = fsSync.readFileSync(filename);
    }
    return fileTree;
}

function addFolderToZip(dir:string,tree:{[key:string]:{}|Buffer},zip:JSZip){
    for (const name in tree) {
        if (Object.prototype.hasOwnProperty.call(tree, name)) {
            if(tree[name] instanceof Buffer) zip.file(path.join(dir,name),tree[name]as Buffer);
            else addFolderToZip(path.join(dir,name),tree[name] as {},zip);
        }
    }
    return zip;
}