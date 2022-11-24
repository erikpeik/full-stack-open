const listHelper = require('../utils/list_helper')
const arrays = require('./arrays')

describe('most likes', () => {
  test('of empty list is empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

  test('when list has only one blog that author and amount of likes matches', () => {
    const result = listHelper.mostLikes(arrays.listWithOneBlog)
    const expected = {
      author: arrays.listWithOneBlog[0].author,
      likes: arrays.listWithOneBlog[0].likes,
    }
    expect(result).toEqual(expected)
  })

  test('with multiple blogs is calculated right', () => {
    const result = listHelper.mostLikes(arrays.blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    expect(result).toEqual(expected)
  })
})
