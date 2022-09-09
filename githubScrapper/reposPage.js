const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml=require("./issues");
// const { response } = require("express");

function getReposPageHtml(url,topic){
    request(url,cb);
    function cb(err, res, body) {
        if (err) {
            console.log("error", err);
        }else if(res.statusCode==404){
            console.log("Page Not Found");
        }
         else {
            getReposLink(body);
        } 
    }
    function getReposLink(html){
        let selecTool = cheerio.load(html);
        let headingsArray = selecTool(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for( let i=0;i<8;i++){
            let twoAnchors=selecTool(headingsArray[i]).find("a");
            let link=selecTool(twoAnchors[1]).attr("href");
            let fullLink=`https://github.com/${link}/issues`;
            // console.log(fullLink);
            let repoName=link.split("/").pop();
            getIssuesPageHtml(fullLink,topic,repoName);
        }
        console.log("`````````````````````````````````````````````````");
    }
    
}
module.exports=getReposPageHtml;