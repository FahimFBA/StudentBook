import "./profile.scss";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import XIcon from "@mui/icons-material/X";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link, useLocation } from "react-router-dom";
import { use, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);

  const { currentUser } = use(AuthContext);

  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      makeRequest.get("/users/find/" + userId).then((res) => {
        return res.data;
      }),
  });

  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () =>
      makeRequest.get("/relationships?followeduserid=" + userId).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following)
        return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["relationship"] });
    },
  });

  const isOwnProfile = userId === currentUser.id;
  const isFollowing = relationshipData?.includes(currentUser.id);

  const handleFollow = () => {
    mutation.mutate(isFollowing);
  };

  return (
    <div className="profile">
      {isLoading ? (
        <div className="page-surface"><div className="loading-state">Loading profile...</div></div>
      ) : error ? (
        <div className="page-surface"><div className="error-state">Could not load this profile.</div></div>
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.user_cover_img} alt="" className="cover" />
            <img
              src={"/upload/" + data.user_profile_img}
              alt={data.user_fullname}
              className="profilePic"
            />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="profileSocials">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  title="X"
                  aria-label="X profile"
                >
                  <XIcon />
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  aria-label="LinkedIn profile"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://pinterest.com/"
                  target="_blank"
                  rel="noreferrer"
                  title="Pinterest"
                  aria-label="Pinterest profile"
                >
                  <PinterestIcon />
                </a>
              </div>
              <div className="center">
                <h1>{data.user_fullname}</h1>
                <div className="info">
                  <div className="item">
                    <PlaceIcon />
                    <span>{data.user_city}</span>
                  </div>
                  <div className="item">
                    <LanguageIcon />
                    <span>{data.user_website}</span>
                  </div>
                </div>
                {rIsLoading ? (
                  <span className="relationshipLoading">Loading...</span>
                ) : isOwnProfile ? (
                  <button
                    className="profilePrimaryAction"
                    onClick={() => setOpenUpdate(true)}
                    type="button"
                  >
                    Update profile
                  </button>
                ) : (
                  <button
                    className="profilePrimaryAction"
                    onClick={handleFollow}
                    type="button"
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                )}
              </div>
              <div className="profileActions">
                {data?.user_occ && (
                  <span className="occupationBadge">{data?.user_occ}</span>
                )}

                {data?.user_cal && (
                  <Link to={data?.user_cal} target="_blank" rel="noreferrer">
                    <button type="button" className="calendarButton">
                      Calendly
                    </button>
                  </Link>
                )}

                <button
                  className="profileMenuButton"
                  type="button"
                  aria-label="Profile options"
                >
                  <MoreVertIcon />
                </button>
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
