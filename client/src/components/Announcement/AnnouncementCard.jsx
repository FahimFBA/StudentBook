import { TrashIcon } from "@heroicons/react/24/outline";

const AnnouncementCard = ({
  announcement_title,
  announcement_content,
  announcement_creation_time,
  user_fullname,
  announcement_id,
  user_profile_img,
  onDelete,
}) => {
  return (
    <article className="resource-card">
      <div className="resource-meta">
        <span className="resource-type">Announcement</span>
        <span>{announcement_creation_time}</span>
      </div>
      <div className="resource-body">
        <h2>{announcement_title}</h2>
        <p>{announcement_content}</p>
      </div>
      <div className="resource-footer">
        <div className="resource-author">
          <img
            src={"/upload/"+user_profile_img}
            alt={user_fullname}
          />
          <span>{user_fullname}</span>
        </div>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(announcement_id)}
          title="Delete announcement"
        >
          <TrashIcon />
          Delete
        </button>
      </div>
    </article>
  );
};

export default AnnouncementCard;
