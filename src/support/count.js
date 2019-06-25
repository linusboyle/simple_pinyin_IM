// 此脚本用于统计总出现次数
// 请在count.txt已生成后运行
const fs = require('fs')

var file = fs.readFileSync("count.txt", "utf8")

var olist = file.split(',')

var retval = 0

for (o of olist) {
  retval += Number(o)
}

console.log(retval)
