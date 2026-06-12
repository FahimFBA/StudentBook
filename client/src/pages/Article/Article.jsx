import { use, useState } from "react";
import "./Article.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import ArticleCard from "../../components/Article/ArticleCard";

const Article = () => {
  const initialData = {
    article_content: "",
    article_title: "",
  };
  const [data, setData] = useState(initialData);

  const { currentUser } = use(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (x) => {
      return makeRequest.post("/articles", x);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article posted successfully");
    },
    onError: () => {
      toast.error("ServerError");
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ ...data, user_id: currentUser.id });
    setData(initialData);
  };

  const {
    isLoading,
    error,
    data: articleData,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: () =>
      makeRequest.get("/articles/get-all-articles").then((res) => {
        return res.data;
      }),
  });

  const handleInputChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const deleteMutation = useMutation({
    mutationFn: (articleId) => {
      return makeRequest.delete("/articles/" + articleId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article deleted successfully");
    },
    onError: () => {
      toast.error("ServerError");
    }
  });

  const handleDelete = (articleId) => {
    deleteMutation.mutate(articleId);
  };

  return (
    <div className="article page-surface">
      <div className="page-stack">
        <div className="page-heading">
          <div>
            <h1>Articles</h1>
            <p>Share research notes, study reflections, and career learning with the campus community.</p>
          </div>
        </div>
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-field">
          <label htmlFor="article_title">Article title</label>
          <input
            type="text"
            id="article_title"
            name="article_title"
            value={data?.article_title}
            placeholder="What should readers remember?"
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-field">
        <label htmlFor="article_content">Your wisdom</label>
        <textarea
          name="article_content"
          id="article_content"
          value={data?.article_content}
          onChange={handleInputChange}
          placeholder="Write your thoughts here..."
          cols={30}
          rows={4}
        ></textarea>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Publishing..." : "Publish article"}
          </button>
          <button type="button" onClick={() => setData(initialData)} className="secondary-button">
            Clear
          </button>
        </div>
      </form>

        <div className="resource-list">
          {error ? (
            <div className="error-state">Could not load articles.</div>
          ) : isLoading ? (
            <div className="loading-state">Loading articles...</div>
          ) : articleData?.length ? (
            articleData.map((item) => (
              <ArticleCard key={item?.article_id} {...item} onDelete={handleDelete} />
            ))
          ) : (
            <div className="empty-state">No articles posted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
