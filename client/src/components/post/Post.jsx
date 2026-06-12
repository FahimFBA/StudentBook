import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { use } from "react";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = use(AuthContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["likes", post.post_id],
    queryFn: () =>
      makeRequest.get("/likes?post_id=" + post.post_id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();
  const liked = Boolean(data?.includes(currentUser.id));
  const cachedComments = queryClient.getQueryData(["comments", post.post_id]);
  const commentCount = Array.isArray(cachedComments) ? cachedComments.length : null;

  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?post_id=" + post.post_id);
      return makeRequest.post("/likes", { post_id: post.post_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"] });
    },
  });

  const handleLike = () => {
    mutation.mutate(liked);
  };

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(post.post_id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.user_profile_img} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.user_fullname}</span>
              </Link>
              <span className="date">
                {moment(post.post_creation_time).fromNow()}
              </span>
            </div>
          </div>
          <button
            className="icon-button"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Post menu"
          >
            <MoreHorizIcon />
          </button>
          {menuOpen && post.user_id === currentUser.id && (
            <button className="deleteMenu" onClick={handleDelete} type="button">
              Delete Post
            </button>
          )}
        </div>
        <div className="content">
          <p>{post.post_desc}</p>
          {post.img && <img src={"/upload/" + post.img} alt="" />}
        </div>
        <div className="info">
          <button
            className={`item ${liked ? "active" : ""}`}
            onClick={handleLike}
            type="button"
            disabled={isLoading || error}
            aria-pressed={liked}
          >
            <span className="actionIcon">
              {!isLoading && liked ? (
                <FavoriteOutlinedIcon className="likedIcon" />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </span>
            <span>{data?.length || 0}</span>
            <span>{data?.length === 1 ? "Like" : "Likes"}</span>
          </button>
          <button
            className={`item ${commentOpen ? "active" : ""}`}
            onClick={() => setCommentOpen(!commentOpen)}
            type="button"
            aria-expanded={commentOpen}
          >
            <span className="actionIcon">
              <TextsmsOutlinedIcon />
            </span>
            {commentCount !== null && <span>{commentCount}</span>}
            <span>{commentCount === 1 ? "Comment" : "Comments"}</span>
          </button>
          <button className="item" type="button">
            <span className="actionIcon">
              <ShareOutlinedIcon />
            </span>
            <span>Share</span>
          </button>
        </div>
        {commentOpen && <Comments post_id={post.post_id} />}
      </div>
    </div>
  );
};

export default Post;
