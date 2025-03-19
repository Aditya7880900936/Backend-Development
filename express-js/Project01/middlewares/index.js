const fs = require('fs');
const path = require('path');

function logReqRes(fileName){
    return (req, res, next) => {
        fs.appendFile(
            "log.txt",
            `${fileName} ${req.method} ${req.url} ${new Date()}\n`,
            (err) => {
                if (err) {
                    console.log(err);
                }
                next()
            }
        )
    }
};

module.exports = logReqRes;