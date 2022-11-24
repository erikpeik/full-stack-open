const listHelper = require('../utils/list_helper')
const arrays = require('./arrays')

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(arrays.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has no blogs, equals 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has multiple blogs, equals the sum of all likes', () => {
    const result = listHelper.totalLikes(arrays.blogs)
    expect(result).toBe(36)
  })
})
