import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import SearchBar from "../SearchBar/SearchBar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [search, setSearch] = useState("f");

  const { isLoading, error, data, refetch } = useQuery(["searches"], () =>
    makeRequest.get(`/searches/${search}`).then((res) => {
      return res?.data;
    })
  );

  const searchBarDataEditted = data?.map((item) => ({
    key: `${item.user_fullname} - ${item?.student_cgpa}`,
    value: `${item.user_fullname} - ${item?.student_cgpa}`,
  }));

  useEffect(() => {
    refetch();
  }, [search]);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    () => {
      return makeRequest.post("/auth/logout");
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["logout"]);
        toast.success("Logout successfully");
        navigate("/login");
      },
      onError: (err) => {
        toast.error("ServerError");
      },
    }
  );

  const onSubmit = async () => {
    mutation.mutate();
  };

  return (
    <div className="navBar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>StudentBook</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />

        <SearchBar
          data={searchBarDataEditted}
          search={search}
          setSearch={setSearch}
        />

        <div className="search">
          <SearchOutlinedIcon />
          {/* <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="text"
            placeholder="Search..."
          /> */}
        </div>
      </div>
      <div className="right">
        <button
          onClick={onSubmit}
          class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
        >
          <span class="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Logout
          </span>
        </button>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />

        <div className="user">
          <img src={"/upload/" + currentUser.user_profile_img} alt="" />
          <span>{currentUser.name}</span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
