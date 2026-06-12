import { TrashIcon } from "@heroicons/react/24/outline";
import { uploadPath } from "../../config";

const ArticleCard = ({
  article_title,
  article_content,
  article_creation_time,
  user_fullname,
  article_id,
  user_profile_img,
  onDelete,
}) => {
  return (
    <article className="resource-card">
      <div className="resource-meta">
        <span className="resource-type">Article</span>
        <span>{article_creation_time}</span>
      </div>
      <div className="resource-body">
        <h2>{article_title}</h2>
        <p>{article_content}</p>
      </div>
      <div className="resource-footer">
        <div className="resource-author">
          <img
            src={uploadPath(user_profile_img)}
            alt={user_fullname}
          />
          <span>{user_fullname}</span>
        </div>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(article_id)}
          title="Delete article"
        >
          <TrashIcon />
          Delete
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;
