let fs=require("fs");
let path=require("path");
function treeFn(dirpath){
    let destpath;
    // 1. input ->dir path given
    if(dirpath==undefined){
        treeHelper( process.cwd(),"");
        return;
    }else {
        let doesExist=fs.existsSync(dirpath);
        if(doesExist){
            treeHelper(dirpath,"");
            
        }else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
}
function treeHelper(dirpath,indent){
    //is file or folder
    let isFile=fs.lstatSync(dirpath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirpath);
        console.log(indent+"|--"+fileName);
    }else{
        let dirName=path.basename(dirpath);
        console.log(indent+"--"+dirName);
        let children=fs.readdirSync(dirpath);
        for( let i=0;i<children.length;i++){
            let childrenPath=path.join(dirpath,children[i])
            treeHelper(childrenPath,indent+"\t");
        }
    }
}



module.exports={
    treeKey:treeFn
}