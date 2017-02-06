const SAME    = 0
    , REPLACE = 1
    , DELETE  = 2
    , INSERT  = 3

function diff(s1, s2) {
  const distanceMatrix = []
  const actionMatrix = []

  distanceMatrix.push(Array.apply(null, Array(s2.length + 1)).map((v, i) => i))
  actionMatrix.push([0].concat(Array(s2.length).fill(INSERT)))

  for (let i = 1; i <= s1.length; i++) {
    const distanceRow = [i + 1]
    const actionRow = [DELETE]
    distanceMatrix.push(distanceRow)
    actionMatrix.push(actionRow)
    for (let j = 1; j <= s2.length; j++) {
      const isSame     = s1[i - 1] === s2[j - 1]
      const deleteDis  = distanceMatrix[i - 1][j] + 1
      const insertDis  = distanceMatrix[i][j - 1] + 1
      const replaceDis = distanceMatrix[i - 1][j - 1] + (isSame ? 0 : 1)
      const action     = Math.min(deleteDis, insertDis, replaceDis)
      distanceMatrix[i][j] = action
      switch (action) {
        case deleteDis:
          actionMatrix[i][j] = DELETE
          break
        case insertDis:
          actionMatrix[i][j] = INSERT
          break
        case replaceDis:
          actionMatrix[i][j] = isSame ? SAME : REPLACE
          break
      }
    }
  }
  // console.log('distanceMatrix:\n', distanceMatrix)
  // console.log('actionMatrix:\n', actionMatrix)
  const diff = []
  for (let i = s1.length, j = s2.length; i > 0 || j > 0;) {
    if (j < 1) break
    const action = actionMatrix[i][j]
    switch (action) {
      case SAME:
        diff[j - 1] = [i - 1, SAME]
        --i
        --j
        break
      case REPLACE:
        diff[j - 1] = s2[j - 1]
        --i
        --j
        break
      case DELETE:
        --i
        break
      case INSERT:
        diff[j - 1] = s2[j - 1]
        --j
        break
    }
  }
  // console.log('diff:', diff)
  let pre = null, tempStr = '', tempArr = []
  const result = []
  for (let i = 0, len = diff.length; i < len; i++) {
    const item = diff[i]
    if (i === 0) {
      if (typeof item === 'string') {
        tempStr = item
      } else if (typeof item === 'object') {
        tempArr = item
        tempArr[1] = 1
      }
    } else {
      if (typeof item === 'string') {
        tempStr = tempStr + item
        if (typeof pre === 'object') {
          result.push(tempArr)
        }
      } else {
        if (typeof pre === 'string') {
          tempArr = item
          ++tempArr[1]
          result.push(tempStr)
          tempStr = ''
        } else if (typeof pre === 'object') {
          if (pre[0] !== item[0] - 1) {
            result.push(tempArr)
            tempArr = item
          }
          ++tempArr[1]
        }
      }
    }
    pre = item
  }
  result.push(typeof pre === 'string' ? tempStr : tempArr)
  return result
}

exports.diff = diff
