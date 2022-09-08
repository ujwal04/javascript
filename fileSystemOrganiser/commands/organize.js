let fs=require("fs");
let path=require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['png', 'jpg', 'jpeg']
}
function organizeFn(dirpath){
    let destpath;
    // 1. input ->dir path given
    if(dirpath==undefined){
        destpath= process.cwd();//current working dir
        return;
    }else {
        let doesExist=fs.existsSync(dirpath);
        if(doesExist){
            // 2. create -> organized files-->dir
            destpath=path.join(dirpath+"organized_files");
            if(fs.existsSync(destpath)==false){
                fs.mkdirSync(destpath);
            }
        }else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizehelper(dirpath,destpath);
    
}

function organizehelper(src,dest){
    // 3. check categories of all files in the input dir
    let childNames =fs.readdirSync(src);
    for(let i=0;i<childNames.length;i++){
        let childAdress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAdress).isFile();
        if(isFile){
            let category=getCategory(childNames[i]);
            // console.log(childNames[i]," --> " ,category);
            // 4. copy/cut files to their respective folders in organized files dir
            sendFiles(childAdress,dest,category);
        }
    }
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for( let type in types){
        let cTypearray=types[type];
        for( let i=0;i<cTypearray.length;i++){
            if(ext==cTypearray[i]){
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to",category);
}

module.exports={
    organizeKey:organizeFn
}