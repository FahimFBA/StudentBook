import "./videos.scss";
import { use, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { uploadPath } from "../../config";

const initialData = {
  video_title: "",
  video_url: "",
  video_description: "",
};

const Videos = () => {
  const [data, setData] = useState(initialData);
  const { currentUser } = use(AuthContext);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: videos = [],
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () =>
      makeRequest.get("/videos/get-all-videos").then((res) => {
        return res.data;
      }),
  });

  const featuredVideo = useMemo(() => videos[0], [videos]);

  const mutation = useMutation({
    mutationFn: (video) => makeRequest.post("/videos", video),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      setData(initialData);
      toast.success("Video posted successfully");
    },
    onError: (mutationError) => {
      toast.error(mutationError?.response?.data || "ServerError");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (videoId) => makeRequest.delete("/videos/" + videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Video deleted successfully");
    },
    onError: () => {
      toast.error("ServerError");
    },
  });

  const handleInputChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ ...data, user_id: currentUser.id });
  };

  return (
    <div className="videos page-surface">
      <div className="videosShell">
        <div className="page-heading">
          <div>
            <h1>Video Portal</h1>
            <p>
              Share YouTube lectures, walkthroughs, demos, and campus learning
              videos with the StudentBook community.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="form-card videoForm">
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="video_title">Video title</label>
              <input
                type="text"
                id="video_title"
                name="video_title"
                value={data.video_title}
                placeholder="What should students watch?"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="video_url">YouTube URL</label>
              <input
                type="url"
                id="video_url"
                name="video_url"
                value={data.video_url}
                placeholder="https://www.youtube.com/watch?v=..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field full">
              <label htmlFor="video_description">Description</label>
              <textarea
                id="video_description"
                name="video_description"
                value={data.video_description}
                placeholder="Add context, notes, or why this video is useful."
                rows={4}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
              disabled={mutation.isPending}
            >
              <AddCircleOutlineIcon />
              {mutation.isPending ? "Publishing..." : "Publish video"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={() => setData(initialData)}
            >
              Clear
            </button>
          </div>
        </form>

        {error ? (
          <div className="error-state">Could not load videos.</div>
        ) : isLoading ? (
          <div className="loading-state">Loading videos...</div>
        ) : videos.length ? (
          <>
            <section className="featuredVideo">
              <div className="videoFrame">
                <iframe
                  src={featuredVideo.video_embed_url}
                  title={featuredVideo.video_title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="featuredDetails">
                <span className="resource-type">Featured</span>
                <h2>{featuredVideo.video_title}</h2>
                <p>{featuredVideo.video_description || "Shared from the StudentBook community."}</p>
                <div className="videoActions">
                  <a href={featuredVideo.video_url} target="_blank" rel="noreferrer">
                    <PlayCircleIcon />
                    Watch
                  </a>
                  <a href={featuredVideo.video_url} target="_blank" rel="noreferrer">
                    <ShareOutlinedIcon />
                    Share
                  </a>
                </div>
              </div>
            </section>

            <section className="videoGrid">
              {videos.map((video) => (
                <article className="videoCard" key={video.video_id}>
                  <a href={video.video_url} target="_blank" rel="noreferrer">
                    <div className="thumb">
                      <img src={video.video_thumbnail_url} alt={video.video_title} />
                      <PlayCircleIcon />
                    </div>
                    <div className="videoCardBody">
                      <h2>{video.video_title}</h2>
                      <p>{video.user_fullname}</p>
                      <span>{video.video_creation_time}</span>
                    </div>
                  </a>
                  <div className="videoFooter">
                    <div className="resource-author">
                      <img
                        src={uploadPath(video.user_profile_img)}
                        alt={video.user_fullname}
                      />
                      <span>{video.user_fullname}</span>
                    </div>
                    {video.user_id === currentUser.id && (
                      <button
                        type="button"
                        className="danger-button"
                        onClick={() => deleteMutation.mutate(video.video_id)}
                        title="Delete video"
                      >
                        <DeleteOutlineIcon />
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </section>
          </>
        ) : (
          <div className="empty-state">No videos posted yet.</div>
        )}
      </div>
    </div>
  );
};

export default Videos;
