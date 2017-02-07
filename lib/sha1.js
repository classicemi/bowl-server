const crypto = require('crypto')

exports.getSHA1 = function(text) {
  const sha1 = crypto.createHash('sha1')
  sha1.update(text)
  return sha1.digest('hex')
}
