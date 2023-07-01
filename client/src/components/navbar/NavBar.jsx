import "./NavBar.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <div className="navBar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>StudentBook</span>
                    <HomeOutlinedIcon />
                    <DarkModeOutlinedIcon />
                    <GridViewOutlinedIcon />

                    <div className="search">
                        <SearchOutlinedIcon />
                        <input type="text" placeholder="Search..." />
                    </div>
                </Link>
            </div>
            <div className="right">
                <PersonOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />

                <div className="user">
                    <img src="https://beeimg.com/images/m47975022502.jpg" alt="" />
                    <span>Fahim Amin</span>
                </div>
            </div>
        </div>
    )
}

export default NavBar