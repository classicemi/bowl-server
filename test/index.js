const expect = require('expect.js')
const lcsDiff = require('../lib/lcs.js').diff
const chunkDiff = require('../lib/chunk.js').diff

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

  it('insert and delete multiple strings between', function() {
    const target = 'abcxdyfghiz'
    expect(lcsDiff(source, target)).to.eql(
      [[0, 3], 'x', [3, 1], 'y', [5, 4], 'z']
    )
  })
})

describe('chunk diff', function() {
  const source = 'abcdefghi'

  it('prefix a string', function() {
    const target = 'xyzabcdefghi'
    expect(chunkDiff(source, target, 3)).to.eql(
      ['xyz', [0, 3]]
    )
    expect(chunkDiff(source, target, 4)).to.eql(
      ['xyz', [0, 3]]
    )
    expect(chunkDiff(source, target, 2)).to.eql(
      ['xyz', [0, 5]]
    )
  })

  it('suffix a string', function() {
    const target = 'abcdefghixyz'
    expect(chunkDiff(source, target, 3)).to.eql(
      [[0, 3], 'xyz']
    )
    expect(chunkDiff(source, target, 4)).to.eql(
      [[0, 2], 'ixyz']
    )
  })

  it('insert one string between', function() {
    const target = 'abcdxyzefghi'
    expect(chunkDiff(source, target, 3)).to.eql(
      [[0, 1], 'dxyzef', [2, 1]]
    )
  })

  it('insert and delete multiple strings between', function() {
    const target = 'abcxydefzgh'
    expect(chunkDiff(source, target, 3)).to.eql(
      [[0, 1], 'xy', [1, 1], 'zgh']
    )
    expect(chunkDiff(source, target, 2)).to.eql(
      [[0, 1], 'cxyd', [2, 1], 'z', [3, 1]]
    )
  })
})
