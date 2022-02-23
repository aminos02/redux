import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import { Navbar } from "./app/Navbar";
import { AddPostForm } from "./features/posts/AddPostForm";
import { EditPost } from "./features/posts/EditPost";
import { PostsList } from "./features/posts/PostsList";
import { SinglePostPage } from "./features/posts/SinglePost";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            )}
          />
          <Route exact path="/posts/:postid" component={SinglePostPage} />
          <Route exact path="/editPost/:postid" component={EditPost} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
