import { TrashIcon } from "@heroicons/react/24/outline";

const JobCard = ({
  job_id,
  job_provider_user_name,
  job_provider_company_name,
  job_provider_company_website,
  job_provider_company_email,
  job_description,
  job_requirement,
  job_salary,
  job_provider_company_twitter,
  job_provider_company_facebook,
  user_profile_img,
  job_creation_time,
  onDelete
}) => {
  return (
    <article className="resource-card job-card">
      <div className="resource-meta">
        <span className="resource-type">Job</span>
        <span>{job_creation_time}</span>
      </div>

      <div className="resource-body">
        <h2>
          <a href={job_provider_company_website} target="_blank" rel="noreferrer">
            {job_provider_company_name}
          </a>
        </h2>
        <p>{job_description}</p>
      </div>

      <dl className="job-details">
        <div>
          <dt>Requirements</dt>
          <dd>{job_requirement}</dd>
        </div>
        <div>
          <dt>Salary</dt>
          <dd>{job_salary}</dd>
        </div>
        <div>
          <dt>Contact</dt>
          <dd>
            <a href={`mailto:${job_provider_company_email}`}>
              {job_provider_company_email}
            </a>
          </dd>
        </div>
      </dl>

      <div className="job-links">
        {job_provider_company_twitter && (
          <a href={job_provider_company_twitter} target="_blank" rel="noreferrer">
            Twitter/X
          </a>
        )}
        {job_provider_company_facebook && (
          <a href={job_provider_company_facebook} target="_blank" rel="noreferrer">
            Facebook
          </a>
        )}
      </div>

      <div className="resource-footer">
        <div className="resource-author">
          <img
            src={"/upload/"+user_profile_img}
            alt={job_provider_user_name}
          />
          <span>{job_provider_user_name}</span>
        </div>
        <button
          type="button"
          className="danger-button"
          onClick={() => onDelete(job_id)}
          title="Delete job"
        >
          <TrashIcon />
          Delete
        </button>
      </div>
    </article>
  );
};

export default JobCard;
