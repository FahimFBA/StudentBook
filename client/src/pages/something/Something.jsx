import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

const Something = () => {
  return (
    <div className="page-surface">
      <div className="page-stack">
        <div className="page-heading">
          <div>
            <h1>Campus Hub</h1>
            <p>
              A quick view of the core student workflows available in
              StudentBook.
            </p>
          </div>
        </div>
        <div className="hub-grid">
          <article className="hub-card">
            <SchoolOutlinedIcon />
            <h2>Articles</h2>
            <p>Capture study notes, research summaries, and learning wins.</p>
          </article>
          <article className="hub-card">
            <CampaignOutlinedIcon />
            <h2>Announcements</h2>
            <p>Keep important department updates and event notices visible.</p>
          </article>
          <article className="hub-card">
            <WorkOutlineOutlinedIcon />
            <h2>Job Portal</h2>
            <p>Share career openings and referrals with students and alumni.</p>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Something;
