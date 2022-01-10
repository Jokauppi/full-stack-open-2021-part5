import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (blog, user) => {
  const response = await axios.post(baseUrl, blog,
    { headers: { authorization: `Bearer ${user.token}` } }
  )
  return response.data
}

const like = async (blogId, blog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, blog)
  return response.data
}

const remove = async (blogId, user) => {
  await axios.delete(`${baseUrl}/${blogId}`,
    { headers: { authorization: `Bearer ${user.token}` } }
  )
}

const exports = { getAll, create, like, remove }

export default exports