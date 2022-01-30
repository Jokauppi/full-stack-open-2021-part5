import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('blog box', () => {

  test('also renders url and likes after show clicked', () => {

    const createHandler = jest.fn()

    const component = render(
      <BlogForm createBlog={createHandler}/>
    )

    const title = component.container.querySelector('input[name="Title"]')
    fireEvent.change(title, {
      target: { value: 'example' }
    })

    const author = component.container.querySelector('input[name="Author"]')
    fireEvent.change(author, {
      target: { value: 'exampler' }
    })

    const url = component.container.querySelector('input[name="Url"]')
    fireEvent.change(url, {
      target: { value: 'example.com' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(createHandler).toHaveBeenLastCalledWith(
      {
        title: 'example',
        author: 'exampler',
        url: 'example.com'
      }
    )

  })

})

