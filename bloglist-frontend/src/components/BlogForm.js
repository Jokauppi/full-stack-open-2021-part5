import React, {useState} from 'react'

const BlogForm = ({ user, blogs, setBlogs, blogService, notify }) => {
  
  const handleCreate = async event => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create(
        {
          title: title,
          author: author,
          url: url
        },
        user
        )
      
      setTitle('')
      setAuthor('')
      setUrl('')

      setBlogs(blogs.concat(newBlog))
      notify.success(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (exception) {
      notify.failure(`Blog creation failed`)
    }
    
  }
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleFieldChange = event => setTitle(event.target.value)
  const handleAuthorFieldChange = event => setAuthor(event.target.value)
  const handleUrlFieldChange = event => setUrl(event.target.value)
  
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title <input type="text" name="Title" onChange={handleTitleFieldChange} value={title} />
        </div>
        <div>
          author <input type="text" name="Author" onChange={handleAuthorFieldChange} value={author} />
        </div>
        <div>
          url <input type="text" name="Url" onChange={handleUrlFieldChange} value={url} />
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
