import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const users = useSelector((state) => state.users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const onSavePost = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addNewPost({ title, content, user: userId })).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const dispatch = useDispatch();

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label>
          Author:
          <select onChange={onAuthorChanged}>
            <option value=""></option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
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
          disabled={!(title && content && userId)}
          type="button"
          onClick={onSavePost}
        >
          Save Post
        </button>
      </form>
    </section>
  );
};
