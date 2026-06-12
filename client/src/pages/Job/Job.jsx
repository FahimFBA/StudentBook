import { use, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./Job.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import JobCard from "../../components/Job/JobCard";

const initialData = {
  job_provider_user_name: "",
  job_provider_company_name: "",
  job_provider_company_linkedin: "",
  job_provider_company_website: "",
  job_provider_company_email: "",
  job_description: "",
  job_requirement: "",
  job_salary: "",
  job_provider_company_twitter: "",
  job_provider_company_facebook: "",
};

const jobFields = [
  {
    name: "job_provider_user_name",
    label: "Recruiter's full name",
    placeholder: "Write your full name...",
  },
  {
    name: "job_provider_company_name",
    label: "Company name",
    placeholder: "Brain Station 23",
  },
  {
    name: "job_provider_company_website",
    label: "Website",
    type: "url",
    placeholder: "https://brainstation23.com",
  },
  {
    name: "job_provider_company_linkedin",
    label: "Official LinkedIn page",
    type: "url",
    placeholder: "https://www.linkedin.com/company/brain-station-23/",
  },
  {
    name: "job_provider_company_twitter",
    label: "Official Twitter/X",
    type: "url",
    placeholder: "https://twitter.com/BrainStation23",
  },
  {
    name: "job_provider_company_facebook",
    label: "Official Facebook page",
    type: "url",
    placeholder: "https://www.facebook.com/brainstation23",
  },
  {
    name: "job_provider_company_email",
    label: "Email address",
    type: "email",
    placeholder: "hrbrainstation23@gmail.com",
  },
  {
    name: "job_salary",
    label: "Salary / salary range",
    placeholder: "Enter the salary range...",
  },
  {
    name: "job_description",
    label: "Job description",
    placeholder: "Write down the complete job description",
    multiline: true,
  },
  {
    name: "job_requirement",
    label: "Job requirements",
    placeholder: "Write down the complete job requirements",
    multiline: true,
  },
];

const Job = () => {
  const [data, setData] = useState(initialData);
  const { currentUser } = use(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (job) => makeRequest.post("/jobs", job),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job posted successfully");
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
    data: jobPosting,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: () =>
      makeRequest.get("/jobs/get-all-jobs").then((res) => {
        return res.data;
      }),
  });

  const handleInputChange = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const deleteMutation = useMutation({
    mutationFn: (jobId) => makeRequest.delete("/jobs/" + jobId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
    },
    onError: () => {
      toast.error("ServerError");
    },
  });

  const handleDelete = (jobId) => {
    deleteMutation.mutate(jobId);
  };

  return (
    <div className="jobs page-surface">
      <div className="page-stack">
        <div className="page-heading">
          <div>
            <h1>Job Portal</h1>
            <p>
              Publish internship, full-time, and referral opportunities for
              students and alumni.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="form-card">
          <div className="form-grid">
            {jobFields.map((field) => (
              <div
                className={`form-field ${field.multiline ? "full" : ""}`}
                key={field.name}
              >
                <label htmlFor={field.name}>{field.label}</label>
                {field.multiline ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={data[field.name]}
                    placeholder={field.placeholder}
                    required
                    rows={4}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type={field.type || "text"}
                    id={field.name}
                    name={field.name}
                    value={data[field.name]}
                    placeholder={field.placeholder}
                    required
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Publishing..." : "Publish job"}
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
            <div className="error-state">Could not load jobs.</div>
          ) : isLoading ? (
            <div className="loading-state">Loading jobs...</div>
          ) : jobPosting?.length ? (
            jobPosting.map((job) => (
              <JobCard key={job?.job_id} {...job} onDelete={handleDelete} />
            ))
          ) : (
            <div className="empty-state">No jobs posted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
