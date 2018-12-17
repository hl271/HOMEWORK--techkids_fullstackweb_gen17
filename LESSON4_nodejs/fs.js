const fs = require('fs')

// WRITE FILE
console.log('WRITE FILE')
fs.writeFile('fs-haha.txt', 'hihihihihihi1+1', (err) => {
    if (err) console.log(err)
    else console.log('SUCCESS')
})

// READ FILE
// 1. Read file sync
console.log('READ FILE SYNC')
let hello = fs.readFileSync('fs-haha.txt', {encoding: "utf-8"})
console.log(hello)

//2. Read file async
console.log('READ FILE ASYNC')
fs.readFile('fs-haha.txt', {encoding: "utf-8"}, (err, data) => {
    if (err) console.log(err)
    else console.log(data)
})

//WRITE OBJECT TO FILE
console.log('WRITE OBJECT TO FILE')
let object = {
    name: "object of course!",
    property: {
        stupid: false,
        ugly: true
    }
}

fs.writeFileSync('object.txt', JSON.stringify(object))
const readObjectSync = fs.readFileSync('object.txt', {encoding: "utf-8"})
console.log(JSON.parse(readObjectSync))

//DELETE A FILE 
fs.unlinkSync('fs-haha.txt')

//RENAME A FILE
fs.renameSync('object.txt', 'obj.txt')

// IMPORT MODULE
console.log('IMPORT MODULE')
const fsModule = require('./fs-module')
const data = fsModule.readFileSync('obj.txt')
fsModule.writeFileSync('hello.txt', 'hello')
fsModule.readFile('obj.txt', (err, data) => {console.log(data)})
let res = fsModule.readFilePromise('obj.txt')
while(res === undefined) {
    console.log(res)
}

console.log('RESULT',res)
console.log(data)