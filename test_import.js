const fs = require('fs')
const path = require('path')


let data = fs.readFileSync('./output/drive_PUREBO01.json')

data = JSON.parse(data)


data = data
    //.filter((e) => e.type === 'SSD')
    .reduce((s, e) => s + e.capacity / Math.pow(2, 40), 0)

fs.readdir('./output', (err, files) => {
    files.forEach((e) => {

        data = fs.readFileSync('./output/' + e)
        data = JSON.parse(data)
        data = data.reduce((s, f) => s + f.capacity / Math.pow(2, 40), 0)
        console.log(data.toFixed(2))
    })
})