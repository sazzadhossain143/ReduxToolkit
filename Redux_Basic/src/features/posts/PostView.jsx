import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from './postSlice';

export default function PostView() {
  const {isloading, posts, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div>
      <h2>Post View</h2>
      {isloading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {!isloading && !error && posts.length > 0 && (
        <section>
          {posts.map((post) => (
            <article key={post.id} style={{border: "1px solid gray", marginBottom: "10px", padding: "10px"}}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
