import { use, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./Announcement.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import AnnouncementCard from "../../components/Announcement/AnnouncementCard";

const initialData = {
  announcement_content: "",
  announcement_title: "",
};

const Announcement = () => {
  const [data, setData] = useState(initialData);
  const { currentUser } = use(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (announcement) => makeRequest.post("/announcements", announcement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement posted successfully");
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
    data: announcementData,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: () =>
      makeRequest.get("/announcements/get-all-announcements").then((res) => {
        return res.data;
      }),
  });

  const handleInputChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const deleteMutation = useMutation({
    mutationFn: (announcementsId) =>
      makeRequest.delete("/announcements/" + announcementsId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      toast.success("Announcement deleted successfully");
    },
    onError: () => {
      toast.error("ServerError");
    },
  });

  const handleDelete = (announcementsId) => {
    deleteMutation.mutate(announcementsId);
  };

  return (
    <div className="announcements page-surface">
      <div className="page-stack">
        <div className="page-heading">
          <div>
            <h1>Announcements</h1>
            <p>
              Post urgent notices, department updates, and event information for
              the student community.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="form-card">
          <div className="form-field">
            <label htmlFor="announcement_title">Announcement title</label>
            <input
              type="text"
              id="announcement_title"
              name="announcement_title"
              value={data.announcement_title}
              placeholder="What is the announcement?"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="form-field">
            <label htmlFor="announcement_content">Announcement details</label>
            <textarea
              name="announcement_content"
              id="announcement_content"
              value={data.announcement_content}
              onChange={handleInputChange}
              placeholder="Write your announcement here..."
              cols={30}
              rows={4}
            />
          </div>
          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Publishing..." : "Publish announcement"}
            </button>
            <button
              type="button"
              onClick={() => setData(initialData)}
              className="secondary-button"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="resource-list">
          {error ? (
            <div className="error-state">Could not load announcements.</div>
          ) : isLoading ? (
            <div className="loading-state">Loading announcements...</div>
          ) : announcementData?.length ? (
            announcementData.map((item) => (
              <AnnouncementCard
                key={item?.announcement_id}
                {...item}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="empty-state">No announcements posted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
