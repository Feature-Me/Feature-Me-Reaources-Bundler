import commandLineArgs from "command-line-args";
import argsOption from "./args";
import path from "path";
import resolvePath from "./resolvePath";
import fs from "fs/promises";
import startPack from "./startPack";

const options = commandLineArgs(argsOption);

const srcPath = resolvePath(options.src, options?.basedir);
const outFilename = options.filename || path.basename(options.src);
const distPath = resolvePath(path.dirname(options.dist), options?.baseDir || options.src);

fs.access(srcPath, fs.constants.R_OK).then(run).catch(console.error)

function run(){
    try {
        console.log(`Started packing : ${srcPath}`);
        startPack(srcPath).then(res => {
            const zip = res[0];
            const ext = res[1]
            zip.generateAsync({ type: "nodebuffer" }).then(buffer => {
                fs.writeFile(path.join(distPath, outFilename + ext), buffer, "binary");
            })
            console.log(`Resources Packed : ${path.join(distPath, outFilename+ext)}`);
        }).catch(console.error);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    
}