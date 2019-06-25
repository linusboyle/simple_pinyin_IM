// 该脚本用于统计各词组出现的次数
// 警告：运行时间较长
// 请确保输入文件是utf8编码
const fs = require('fs')

const contentname = "whole.txt"
var istream  = fs.createReadStream(contentname, {
  encoding: "utf8",
  highWaterMark: 512 * 1024 // 512K
})

const letterfile = "letters.txt"
const letters = fs.readFileSync(letterfile, "utf8").split('')
const llength = letters.length

var matrix = []
var count = null

function prebuild() {
  // first make a row
  let tmp = []
  let i = 0
  while (i < llength) {
    tmp.push(0)
    i++
  }

  count = Array.from(tmp);

  // now insert the column
  
  let j = 0
  while (j < llength) {
    matrix.push(Array.from(tmp)) // deep copy
    j++
  }
}

prebuild() // now matrix is a llength x llength array
                 // matrix[i][j] means the number of occurrence of words with id 'ij' in the news

console.log("matrix prebuild done")

function buildM() {
  console.log("matrix build start")
  istream.on('data', (chunk) => {
    console.log(`chunk ${chunk.length} received`)
    let prev = -1
    let li = 0

    while (li < chunk.length) {
      let index = letters.indexOf(chunk[li])

      if (prev !== -1) { // previous character is valid
        if (index !== -1) { // and this character is valid, too
          matrix[prev][index]++
        }
      }
      prev = index
      li++;
    }
    console.log(`chunk ${chunk.length} processed`)
  })
}

function buildC() {
  console.log("counttable build start")
  istream.on('data', (chunk) => {
    console.log(`chunk ${chunk.length} received`)

    let li = 0
    while (li < chunk.length) {
      let index = letters.indexOf(chunk[li])

      if (index !== -1) {
        count[index]++
      }
      li++
    }

    console.log(`chunk ${chunk.length} processed`)
  })
}

//buildM()
buildC()

//var ostream = fs.createWriteStream("occurrence.txt")
var ostream = fs.createWriteStream("count.txt")

function writeoutM() {
  for (let line of matrix) {
    ostream.write(line.join(',') + ",\n")
  }
}

function writeoutC() {
  ostream.write(count.join(',') + "\n")
}

istream.on('end', () => {
  console.log("write start")
  //writeoutM()
  writeoutC()
  console.log("write done")
})
