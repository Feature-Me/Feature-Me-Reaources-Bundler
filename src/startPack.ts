import path from "path";
import fs from "fs/promises";
import json5 from "json5";
import createMusicPack from "./createMusicPack";
import JSZip from "jszip";
import fileExt from "./fileExt";

export default function startPack(pathName:string) {
    return new Promise<[JSZip,string]>((resolve,reject)=>{
        fs.readdir(pathName).then((file)=>{
            if (file.includes("FileMap.json")){
                fs.readFile(path.join(pathName,"FileMap.json"),"utf-8")
                .then(txt=>json5.parse(txt))
                .then(async json=>{
                    let packFunc:Function = ()=>{};
                    switch(json.type){
                        case "musicPack":
                            packFunc = createMusicPack
                        break;
                        default:
                            break;
                    }
                    const zip = await packFunc(pathName, file);
                    resolve([zip,fileExt[json.type] || "behavior"]);
                }).catch(reject);
            }
        }).catch(reject)
    })
}