const listHelper = require('../utils/list_helper')
const arrays = require('./arrays')

describe('most blogs', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

  test('when list has only one blog equals that author and 1 blog', () => {
    const result = listHelper.mostBlogs(arrays.listWithOneBlog)
    const expected = { author: arrays.listWithOneBlog[0].author, blogs: 1 }
    expect(result).toEqual(expected)
  })

  test('with multiple blogs is calculated right', () => {
    const result = listHelper.mostBlogs(arrays.blogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    expect(result).toEqual(expected)
  })
})
