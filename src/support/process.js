// 该脚本用于为汉字分配数字id
// 并据此生成新的转换表
const fs = require('fs')

const letterfile = "letters.txt"
const p2lfile = "pinyin2letter.txt" 

// 一二级汉字表
let letters = fs.readFileSync(letterfile, {
  encoding: "utf8"
}).split('')

// 检字表
let p2l = fs.readFileSync(p2lfile, {
  encoding: "utf8"
}).split('')

for (let index in p2l) {
  let word = p2l[index]
  let id = letters.indexOf(word)
  if (id !== -1) {
    p2l[index] = id 
  }
}

const outputfile = "p2l.txt"
fs.writeFileSync(outputfile, p2l.join(''));
