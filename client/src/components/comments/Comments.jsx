import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
const Comments = ({ post_id }) => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?post_id=${post_id}`).then((res) => {
      return res?.data
    })
  );

  // console.log(data);
  // console.log("isloading", isLoading);

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.user_profile_img} alt="" />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>
      {isLoading
        ? "loading"
        : data?.map((comment) => (
            <div className="comment">
              <img src={comment.user_profile_img} alt="" />
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
