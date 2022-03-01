import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("blog box", () => {
  test("by default renders title and author but not url or likes", () => {
    const blog = {
      title: "example",
      author: "exampler",
      url: "example.com",
      likes: 2,
      user: {
        name: "user name",
        username: "username",
      },
    };

    const component = render(
      <Blog blog={blog} user={{}} likeBlog={() => {}} deleteBlog={() => {}} />
    );

    const container = component.container;

    expect(container).toHaveTextContent("example | exampler");

    const urlElement = container.querySelector(".url");
    expect(urlElement).toBeFalsy();

    const likesElement = container.querySelector(".likes");
    expect(likesElement).toBeFalsy();
  });

  test("also renders url and likes after show clicked", () => {
    const blog = {
      title: "example",
      author: "exampler",
      url: "example.com",
      likes: 2,
      user: {
        name: "user name",
        username: "username",
      },
    };

    const component = render(
      <Blog blog={blog} user={{}} likeBlog={() => {}} deleteBlog={() => {}} />
    );

    const container = component.container;

    const show = component.getByText("Show");
    fireEvent.click(show);

    const urlElement = container.querySelector(".url");
    expect(urlElement).toBeDefined();

    const likesElement = container.querySelector(".likes");
    expect(likesElement).toBeDefined();
  });

  test("also renders url and likes after show clicked", () => {
    const blog = {
      title: "example",
      author: "exampler",
      url: "example.com",
      likes: 2,
      user: {
        name: "user name",
        username: "username",
      },
    };

    const likeHandler = jest.fn();

    const component = render(
      <Blog
        blog={blog}
        user={{}}
        likeBlog={likeHandler}
        deleteBlog={() => {}}
      />
    );

    const show = component.getByText("Show");
    fireEvent.click(show);

    const like = component.getByText("Like");
    fireEvent.click(like);
    fireEvent.click(like);

    expect(likeHandler).toHaveBeenCalledTimes(2);
  });
});
