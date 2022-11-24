const dummy = (blogs) => {
  !blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => (max.likes > item.likes ? max : item)
  return blogs.length === 0 ? [] : blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const reducer = (max, item) => {
    max[item.author] ? max[item.author]++ : (max[item.author] = 1)
    return max
  }
  const authors = blogs.reduce(reducer, {})
  const max = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  )
  return { author: max, blogs: authors[max] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const reducer = (max, item) => {
    max[item.author]
      ? (max[item.author] += item.likes)
      : (max[item.author] = item.likes)
    return max
  }
  const authors = blogs.reduce(reducer, {})
  const max = Object.keys(authors).reduce((a, b) =>
    authors[a] > authors[b] ? a : b
  )
  return { author: max, likes: authors[max] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
