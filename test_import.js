const fs = require('fs')
const path = require('path')


let data = fs.readFileSync('drive_PUREBO01.json')

data = JSON.parse(data)


data = data
    //.filter((e) => e.type === 'SSD')
    .reduce((s, e) => s + e.capacity / Math.pow(2, 40), 0)



console.log(data.toFixed(2))


filterJSON = (fileName) => {
    return fileName
}



fs.readdir('.', (err, files) => {
    files.forEach(file => console.log(path))
})