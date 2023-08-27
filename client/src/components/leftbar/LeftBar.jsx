import "./leftbar.scss";
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import ApplicationIcon from "../../assets/application.png";
import AnnouncementIcon from "../../assets/loudspeaker.png";
import ResearchIcon from "../../assets/research.png";
import MailIcon from "../../assets/gmail.png";
import CourseraIcon from "../../assets/coursera.png";
import GoodReadIcon from "../../assets/goodreads.png";
import HomeIcon from "../../assets/homepage.png";
import LMSIcon from "../../assets/learning.png";
import UCAMIcon from "../../assets/immigration.png";
import GitHubIcon from "../../assets/github.png";
import JobIcon from "../../assets/job.png";
import CodeIcon from "../../assets/coding.png";
import StackIcon from "../../assets/stackoverflow.png";
import BkashIcon from "../../assets/bkash.png";
import BankIcon from "../../assets/debit-card.png";
import QuoraIcon from "../../assets/quora.png";
import FCC from "../../assets/fcc.png";
import LinkedInIcon from "../../assets/linkedin.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.user_profile_img} alt="" />
            <span>{currentUser.user_name}</span>
          </div>
          <Link to="/" className="item">
            <img src={HomeIcon} alt="" />
            <span>Home</span>
          </Link>
          <Link to="/articles" className="item">
            <img src={ApplicationIcon} alt="" />
            <span>Articles</span>
          </Link>
          <Link to="/announcements" className="item">
            <img src={AnnouncementIcon} alt="" />
            <span>Announncement</span>
          </Link>
          <Link to="/jobs" className="item">
            <img src={JobIcon} alt="" />
            <span>Job Portal</span>
          </Link>
          <Link to="http://lms.uiu.ac.bd/" target="_blank" className="item">
            <img src={LMSIcon} alt="" />
            <span>eLMS</span>
          </Link>
          <Link to="http://ucam.uiu.ac.bd/" target="_blank" className="item">
            <img src={UCAMIcon} alt="" />
            <span>UCAM</span>
          </Link>
        </div>

        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <Link to="http://github.com/" target="_blank" className="item">
            <img src={GitHubIcon} alt="" />
            <span>GitHub</span>
          </Link>
          <Link
            to="https://stackoverflow.com/"
            target="_blank"
            className="item"
          >
            <img src={StackIcon} alt="" />
            <span>StackOverflow</span>
          </Link>
          <Link to="mailto://" target="_blank" className="item">
            <img src={MailIcon} alt="" />
            <span>GMail</span>
          </Link>
          <Link
            to="https://www.researchgate.net/"
            target="_blank"
            className="item"
          >
            <img src={ResearchIcon} alt="" />
            <span>ResearchGate</span>
          </Link>
          <Link to="https://leetcode.com/" target="_blank" className="item">
            <img src={CodeIcon} alt="" />
            <span>LeetCode</span>
          </Link>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <Link
            to="https://ib.dhakabank.com.bd/"
            target="_blank"
            className="item"
          >
            <img src={BankIcon} alt="" />
            <span>Tuition Fee Payment (Dhaka Bank)</span>
          </Link>
          <Link to="https://www.bkash.com/" target="_blank" className="item">
            <img src={BkashIcon} alt="" />
            <span>bKash</span>
          </Link>
          <Link to="https://linkedin.com/" target="_blank" className="item">
            <img src={LinkedInIcon} alt="" />
            <span>LinkedIn</span>
          </Link>
          <Link
            to="https://www.freecodecamp.org/"
            target="_blank"
            className="item"
          >
            <img src={FCC} alt="" />
            <span>freeCodeCamp</span>
          </Link>
          <Link to="https://www.coursera.org/" target="_blank" className="item">
            <img src={CourseraIcon} alt="" />
            <span>Coursera</span>
          </Link>
          <Link
            to="https://www.goodreads.com/"
            target="_blank"
            className="item"
          >
            <img src={GoodReadIcon} alt="" />
            <span>GoodRead</span>
          </Link>
          <Link to="https://www.quora.com/" target="_blank" className="item">
            <img src={QuoraIcon} alt="" />
            <span>Quora</span>
          </Link>
          {/* <div className="item">
            <img src={Courses} alt="" />
            <span>Courses</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div>
          <div className="item">
            <img src={Events} alt="" />
            <span>Event</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
