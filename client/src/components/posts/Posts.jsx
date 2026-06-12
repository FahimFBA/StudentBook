import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () =>
      makeRequest.get("/posts?userId=" + userId).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="posts">
      {error
        ? <div className="error-state">Something went wrong.</div>
        : isLoading
        ? <div className="loading-state">Loading posts...</div>
        : data?.length
        ? data.map((post) => <Post post={post} key={post.post_id} />)
        : <div className="empty-state">No posts yet.</div>}
    </div>
  );
};

export default Posts;
