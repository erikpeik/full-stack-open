const listHelper = require('../utils/list_helper')
const arrays = require('./arrays')

describe('favorite blog', () => {
  test('when list has only one blog, equals that blog', () => {
    const result = listHelper.favoriteBlog(arrays.listWithOneBlog)
    expect(result).toEqual(arrays.listWithOneBlog[0])
  })

  test('when list has no blogs, return empty array', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual([])
  })

  test('when list has multiple blogs, return the blog with most likes', () => {
    const result = listHelper.favoriteBlog(arrays.blogs)
    expect(result).toEqual(arrays.blogs[2])
  })

  test('when list has multiple blogs with same number of likes, return the first blog with most likes', () => {
    const result = listHelper.favoriteBlog(arrays.listWithDuplicateBlogs)
    expect(result).toEqual(arrays.listWithDuplicateBlogs[0])
  })
})
