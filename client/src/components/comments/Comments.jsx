import { use, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Comments = ({ post_id }) => {
  const [comment_desc, setCommentDesc] = useState("");
  const { currentUser } = use(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", post_id],
    queryFn: () =>
      makeRequest.get(`/comments?post_id=${post_id}`).then((res) => {
        return res?.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ comment_desc, post_id });
    setCommentDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.user_profile_img} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={comment_desc}
          onChange={(e) => setCommentDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.comment_id}>
              <img src={"/upload/" + comment.user_profile_img} alt="" />
              <div className="info">
                <span>{comment.user_name}</span>
                <p>{comment.comment_desc}</p>
              </div>
              <span className="date">
                {moment(comment.comment_creation_time).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
