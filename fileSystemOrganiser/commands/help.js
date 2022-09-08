
function helpFn(){
    console.log(`
            node main.js tree "dirpath"
            node main.js organise "dirpath"
            node main.js help      
    `);
}
module.exports={
    helpKey:helpFn
}