const dummy = (blogs) => {
  !blogs
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => (sum + item.likes)
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (max, item) => (max.likes > item.likes ? max : item)
  return blogs.length === 0 ? [] : blogs.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
