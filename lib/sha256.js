const crypto = require('crypto')

exports.getHASH = function(text) {
  const hash = crypto.createHash('sha256')
  hash.update(text)
  return hash.digest('hex')
}
