import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import { Link } from "react-router-dom";
import { use, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SearchBar from "../SearchBar/SearchBar";
import { useLogout } from "../../hooks/useLogout";

const NavBar = () => {
  const { toggle, darkMode } = use(DarkModeContext);
  const { currentUser } = use(AuthContext);
  const [search, setSearch] = useState("");
  const { logout, isLoggingOut } = useLogout();

  const { data, isError, isFetching } = useQuery({
    queryKey: ["searches", search.trim()],
    queryFn: () =>
      makeRequest.get(`/searches/${encodeURIComponent(search.trim())}`).then((res) => {
        return res?.data;
      }),
    enabled: search.trim().length > 1,
  });

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" className="brand">
          <span className="brandMark">SB</span>
          <span>StudentBook</span>
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <SearchBar
            data={data}
            isError={isError}
            isLoading={isFetching}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
      <div className="right">
        <Link to="/" className="navIcon" title="Home">
          <HomeOutlinedIcon />
        </Link>
        <Link to="/videos" className="navIcon" title="Videos">
          <VideoLibraryOutlinedIcon />
        </Link>
        <button className="navIcon" onClick={toggle} type="button" title="Toggle theme">
          {darkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </button>
        <button className="navIcon optionalNavIcon" type="button" title="Messages">
          <EmailOutlinedIcon />
        </button>
        <button className="navIcon optionalNavIcon" type="button" title="Notifications">
          <NotificationsOutlinedIcon />
        </button>
        <div className="user" title={currentUser.user_fullname}>
          <img
            src={"/upload/" + currentUser.user_profile_img}
            alt={currentUser.user_fullname}
          />
          <span>{currentUser.user_fullname}</span>
        </div>
        <button
          aria-label="Logout"
          className="logoutButton"
          disabled={isLoggingOut}
          onClick={logout}
          type="button"
        >
          <LogoutOutlinedIcon fontSize="small" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
