import "./mobileNav.scss";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { use } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useLogout } from "../../hooks/useLogout";

const MobileNav = () => {
  const { currentUser } = use(AuthContext);
  const { logout, isLoggingOut } = useLogout();

  const items = [
    { to: "/", label: "Home", icon: <HomeOutlinedIcon />, end: true },
    { to: "/articles", label: "Articles", icon: <ArticleOutlinedIcon /> },
    {
      to: "/announcements",
      label: "Notices",
      icon: <CampaignOutlinedIcon />,
    },
    { to: "/jobs", label: "Jobs", icon: <WorkOutlineOutlinedIcon /> },
    { to: "/videos", label: "Videos", icon: <VideoLibraryOutlinedIcon /> },
    {
      to: `/profile/${currentUser?.id}`,
      label: "Profile",
      icon: <PersonOutlineOutlinedIcon />,
    },
  ];

  return (
    <nav className="mobileNav" aria-label="Primary mobile navigation">
      {items.map((item) => (
        <NavLink
          className={({ isActive }) => `mobileNavItem${isActive ? " active" : ""}`}
          end={item.end}
          key={item.to}
          to={item.to}
        >
          {item.icon}
          <span>{item.label}</span>
        </NavLink>
      ))}
      <button
        aria-label="Logout"
        className="mobileNavItem mobileNavAction"
        disabled={isLoggingOut}
        onClick={logout}
        type="button"
      >
        <LogoutOutlinedIcon />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default MobileNav;
