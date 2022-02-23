import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updatePost, selectPostById } from "./postsSlice";

export const EditPost = ({ match }) => {
  const history = useHistory();

  const { postid } = match.params;
  const post = useSelector((state) => selectPostById(state, postid));

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const dispatch = useDispatch();

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label>
          <p style={{ marginBottom: 0 }}>Post Title:</p>
          <input placeholder="" value={title} onChange={onTitleChanged} />
        </label>
        <label>
          Content:
          <textarea
            placeholder=""
            value={content}
            onChange={onContentChanged}
          />
        </label>
        <button
          disabled={!(title && content)}
          type="button"
          onClick={() => {
            if (title && content)
              dispatch(updatePost({ id: post.id, title, content }));
            setTitle("");
            setContent("");
            history.push(`/posts/${post.id}`);
          }}
        >
          Update Post
        </button>
      </form>
    </section>
  );
};
