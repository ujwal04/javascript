#!/usr/bin/env node
let fs=require("fs");
let inputArr=process.argv.slice(2);
// console.log(inputArr);
let optionsArr=[];
let filesArr=[];
//identify options and files
for(let i=0;i<inputArr.length;i++){
    let firstChar=inputArr[i].charAt(0);
    if(firstChar=="-"){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

//options check-->edge case
let areBothPresent=optionsArr.includes("-b")&&optionsArr.includes("-n")
if(areBothPresent==true){
    console.log("either enter -n or -b option");
    return;
}
//existence
for(let i=0;i<filesArr.length;i++){
    let isPresent=fs.existsSync(filesArr[i]);
    if(isPresent==false){
        console.log(`file ${filesArr[i]} is not present`);
        return;
    }
    
}

//read
let content="";
for(let i=0;i<filesArr.length;i++){
    let bufferContent=fs.readFileSync(filesArr[i]);
    content+=bufferContent+"\r\n";
}
// console.log(content);

let contentArray=content.split("\r\n");
// console.log(contentArray);


//-s
let isSPresent=optionsArr.includes("-s");
if(isSPresent==true){
    for(let i=1;i<contentArray.length;i++){
        // console.log(content);
        if(contentArray[i]==""&&contentArray[i-1]==""){
            contentArray[i]=null;
        }else if(contentArray[i]==""&&contentArray[i-1]==null){
            contentArray[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArray.length;i++){
        if(contentArray[i]!=null){
            tempArr.push(contentArray[i]);
        }
    }
    contentArray=tempArr;
    // console.log(contentArray.join("\n"));
}

let isNPresent=optionsArr.includes("-n");
if(isNPresent==true){
    for(let i=0;i<contentArray.length;i++){
        contentArray[i]=`${i+1} ${contentArray[i]}`;
    }
}
// console.log(contentArray);
let isBPresent=optionsArr.includes("-b");
if(isBPresent==true){
    let count=1;
    for(let i=0;i<contentArray.length;i++){
        if(contentArray[i]!="")
        contentArray[i]=`${count} ${contentArray[i]}`;
        count++;
    }
}
// console.log(contentArray.join("\n"));