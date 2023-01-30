import path from "path";

export default function resolvePath(src:string,base?:string){
    if(!src) throw new Error("file path is empty");
    if(path.isAbsolute(src)) return src;
    else if(base) {
        if(path.isAbsolute(base)) return path.join(base,src);
        else return path.join(__dirname,base,src);
    }
    else return path.join(__dirname,src);
}