const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const PORT = 3000

const chunkDiff = require('./lib/chunk.js')

http.createServer((req, res) => {
  const file = resolveFile(req.url)
  const newFile = readFile(file.pathname)
  const oldFile = readFile()
}).listen(PORT, function() {
  console.log(`bowl-server now listening on port ${PORT}`)
})

function resolveFile(URL, host = '.') {
  const parsedUrl = url.parse(URL)
  const parsedQs = qs.parse(parsedUrl.query)
  const parsedFileName = parsedUrl.pathname.match(/\.(\w+)\.(\w+)$/)
  return {
    pathname: `${host}${parsedUrl.pathname}`,
    ext: parsedFileName[2],
    baseVersion: parsedQs.baseVersion,
    version: parsedFileName[1]
  }
}

function readFile(pathname) {
  return fs.readFileSync(pathname, {
    encoding: 'utf-8'
  })
}
