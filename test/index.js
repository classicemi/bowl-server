const expect = require('expect.js')
const lcsDiff = require('../lib/lcs.js').diff

describe('lcs diff', function() {
  const source = 'abcdefghi'

  it('prefix a string', function() {
    const target = 'xyzabcdefghi'
    expect(lcsDiff(source, target)).to.eql(
      ['xyz', [0, 9]]
    )
  })

  it('suffix a string', function() {
    const target = 'abcdefghixyz'
    expect(lcsDiff(source, target)).to.eql(
      [[0, 9], 'xyz']
    )
  })

  it('insert one string between', function() {
    const target = 'abcdxyzefghi'
    expect(lcsDiff(source, target)).to.eql(
      [[0, 4], 'xyz', [4, 5]]
    )
  })
})
