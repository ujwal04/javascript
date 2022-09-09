const request = require("request");
const cheerio = require("cheerio");
const fs=require("fs");
const path=require("path");
const pdfkit = require("pdfkit");

function getIssuesPageHtml(url,topic,repoName) {
    // console.log(url);
    // let pdfName=repoName2+".pdf";
    // pagePath+="/"+pdfName;
    request(url, cb);

    function cb(err, res, body) {
        if (err) {
            console.log(err);
        }
        else if(res.statusCode==404){
            console.log("Page Not Found");
        }
        else {
            getIssues(body);
        }
    }

    
    function getIssues(html) {
        let selecTool = cheerio.load(html);
        let issuesElementArr = selecTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        let arr=[];
        for (let i = 0; i <issuesElementArr.length; i++) {
            let link=selecTool(issuesElementArr[i]).attr("href"); 
            // console.log(link);
            arr.push(link);
        }   
        // console.log(topic,"     ",arr);
        let folderpath=path.join(__dirname,topic);
        dirCreator(folderpath);
        let filepath=path.join(folderpath,repoName+".json");
        let text=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filepath));
        pdfDoc.text(text);
        pdfDoc.end;
        fs.writeFileSync(filepath,JSON.stringify(arr));

    }
    // let doc = new pdfkit
    // doc.pipe(fs.createWriteStream(pagePath));
    // let count =1;
    // doc.fontSize(50).text(repoName2);
    // for(let i = 0; i < finalData.length; i++)
    // {
    //     // doc.text();
    //     let data = JSON.stringify(finalData[i].trim());
    //     if((i+1)%2!=0)
    //     {
    //         dataNotLink = count + ")- " + data;
    //         doc.fontSize(20).text(dataNotLink);
    //         count++;
    //     }
    //     else{
    //         // data = chalk.red(data);
    //         doc.fontSize(15).text(data);
    //     }
    //     // console.log(data);

    // }
    // doc.end();
}
module.exports = getIssuesPageHtml;
function dirCreator(folderpath){
    if(fs.existsSync(folderpath)==false){
        fs.mkdirSync(folderpath);
    }
}
