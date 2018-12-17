const fs = require('fs')

function readFileSync(filePath) {
    return fileData = fs.readFileSync(filePath, {encoding: "utf-8"})

}

function writeFileSync (filePath, content) {
    fs.writeFileSync(filePath, content)
}

function readFile(filePath, callback) {
    fs.readFile(filePath, {encoding: "utf-8"}, (err, data) => {
        callback(err, data)
    })
}

async function readFilePromise(filePath) {
    let promise = new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: "utf-8"}, (err, data) => {
            resolve(data)
        })
    })
    return await promise
}

module.exports = {readFileSync, writeFileSync, readFile, readFilePromise}

