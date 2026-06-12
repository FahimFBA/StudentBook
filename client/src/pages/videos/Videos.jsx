import "./videos.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const videos = [
  {
    title: "Campus project showcase",
    channel: "StudentBook",
    views: "24K views",
    age: "1 day ago",
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Research sprint recap",
    channel: "UIU Research",
    views: "8.4K views",
    age: "3 days ago",
    image:
      "https://images.pexels.com/photos/3182750/pexels-photo-3182750.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Career prep workshop",
    channel: "Career Services",
    views: "15K views",
    age: "1 week ago",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    title: "Alumni mentoring session",
    channel: "StudentBook Alumni",
    views: "11K views",
    age: "2 weeks ago",
    image:
      "https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];

const Videos = () => {
  return (
    <div className="videos page-surface">
      <div className="videosShell">
        <div className="page-heading">
          <div>
            <h1>Video Portal</h1>
            <p>
              Watch campus lectures, project demos, workshops, and community
              updates without leaving StudentBook.
            </p>
          </div>
        </div>

        <section className="featuredVideo">
          <div className="videoFrame">
            <iframe
              src="https://www.youtube.com/embed/k3Vfj-e1Ma4"
              title="Campus project showcase"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="featuredDetails">
            <span className="resource-type">Featured</span>
            <h2>Campus project showcase</h2>
            <p>
              A focused walkthrough from the student community, collected for
              classmates who want to revisit workshops, demos, and talks.
            </p>
            <div className="videoActions">
              <button type="button">
                <ThumbUpOutlinedIcon />
                Like
              </button>
              <button type="button">
                <BookmarkBorderOutlinedIcon />
                Save
              </button>
              <button type="button">
                <ShareOutlinedIcon />
                Share
              </button>
            </div>
          </div>
        </section>

        <section className="videoGrid">
          {videos.map((video) => (
            <article className="videoCard" key={video.title}>
              <div className="thumb">
                <img src={video.image} alt={video.title} />
                <PlayCircleIcon />
              </div>
              <div>
                <h2>{video.title}</h2>
                <p>{video.channel}</p>
                <span>
                  {video.views} - {video.age}
                </span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Videos;
