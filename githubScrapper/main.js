let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./reposPage");
request(url, cb);

function cb(err, res, body) {
    if (err) {
        console.log("error", err);
    } else if(res.statusCode==404){
        console.log("Page Not Found");
    }
    else {
        handleHTML(body);
    }
}

function handleHTML(html) {
    let selecTool = cheerio.load(html);
    let relativeLinkArr = selecTool(".no-underline.d-flex.flex-column.flex-justify-center");
    for (let i = 0; i < 3; i++) {
        // console.log(relativeLinkArr);   
        let href=selecTool(relativeLinkArr[i]).attr("href");
        let topic=href.split("/").pop();
        let fullLinkArr = "https://github.com" + href;
        getReposPageHtml(fullLinkArr,topic);
    }

}
