// 将所有语料连接起来
// 请确保语料是utf8编码
const fs = require('fs')

var stream = fs.createWriteStream('whole.txt', {
  flags: 'a'
})

function process(data) {
  let content = ""
  let newslist = data.split('\n'); // 新闻数组
  for (let news of newslist) {
      if (news.length !== 0) {
        let jn = JSON.parse(news);
        content += jn.html
      } 
  }

  stream.write(content)
}

function readAndProcess(month) {
  console.log(month)
  let filename = `2016-${month}.txt`;
  let file = fs.readFileSync(filename, "utf8")
  process(file)
}

readAndProcess("02")
readAndProcess("04")
readAndProcess("05")
readAndProcess("06")
readAndProcess("07")
readAndProcess("08")
readAndProcess("09")
readAndProcess("11")

stream.end()
