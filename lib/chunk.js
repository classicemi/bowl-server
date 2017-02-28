const getHASH = require('./sha256.js').getHASH

function diff(s1, s2, size) {
  const oldMap = split(s1, size)
  const diffArr = diffChunk(s2, oldMap, size)
  return diffArr
}

function split(s, size) {
  let idx = 0,
      chunkIdx = 0,
      hash = '',
      map = {},
      length = s.length
  while (idx < length) {
    hash = getHASH(s.substr(idx, size))
    const existingChunk = map[hash]
    const chunkIdxArr = existingChunk ? existingChunk : []
    chunkIdxArr.push(chunkIdx)
    if (!existingChunk) map[hash] = chunkIdxArr
    ++chunkIdx
    idx = idx + size
  }
  return map
}

function diffChunk(s, map, size) {
  const result = []
  let idx = 0,
      referer = 0,
      length = s.length,
      diffStr = ''
  while (idx <= length) {
    const end = idx + size - 1 > length ? length + 1 : idx + size
    const chunk = s.substring(idx, end)
    const hash = getHASH(chunk)
    const matchedIdx = match(hash, map, referer)
    if (matchedIdx > -1) {
      if (diffStr) {
        result.push(diffStr)
        diffStr = ''
      }
      result.push([matchedIdx, 1])
      idx = idx + size
    } else {
      diffStr = diffStr + s.substr(idx++, 1)
    }
  }
  if (diffStr) {
    result.push(diffStr)
    diffStr = ''
  }
  return compress(result)
}

function match(hash, map, referer) {
  const exsitingIdxArr = map[hash]
  return exsitingIdxArr ? getNearestIdx(exsitingIdxArr, referer) : -1
}

function getNearestIdx(arr, referer) {
  let lIdx = arr[0], rIdx
  for (let i = 0; i < arr.length; i++) {
    rIdx = arr[i]
    if (rIdx >= referer && lIdx <= referer) {
      return rIdx - referer >= referer - lIdx ? lIdx : rIdx
    } else if (rIdx >= referer && lIdx >= referer) {
      return lIdx
    } else {
      lIdx = rIdx
    }
  }
  return lIdx
}

function compress(diff) {
  let referer = -1, tempArr = []
  const result = []
  for (let i = 0, len = diff.length; i < len; i++) {
    const item = diff[i]
    if (typeof item === 'string') {
      if (tempArr.length) {
        result.push(tempArr)
        referer = -1
        tempArr = []
      }
      result.push(item)
    } else if (typeof item === 'object') {
      if (referer < 0) {
        referer = item[0]
        tempArr = [item[0], 1]
      } else {
        if (item[0] === referer + 1) {
          referer = item[0]
          ++tempArr[1]
        } else {
          result.push(tempArr)
          referer = item[0]
          tempArr = [item[0], 1]
        }
      }
    }
  }
  if (tempArr.length) {
    result.push(tempArr)
  }
  return result
}

exports.diff = diff
