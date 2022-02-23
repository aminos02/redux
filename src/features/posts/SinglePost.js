import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectPostById } from "./postsSlice";

export const SinglePostPage = ({ match }) => {
  const { postid } = match.params;
  const post = useSelector((state) => selectPostById(state, postid));

  const user = useSelector((state) =>
    state.users.find((user) => user.id === post.user)
  );
  return (
    <section>
      {!post ? (
        <h2>Post Not Found</h2>
      ) : (
        <article>
          <h2>{post.title} </h2>
          <p>created by {user?.name} </p>

          <p className="post-content">{post.content}</p>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      )}
    </section>
  );
};
