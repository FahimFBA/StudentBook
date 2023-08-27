import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "./Job.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import JobCard from "../../components/Job/JobCard";

const Job = () => {
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
    job_creation_time: "",
  };

  const [data, setData] = useState(initialData);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (j) => {
      return makeRequest.post("/jobs", j);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Job posted successfully");
      },
      onError: (err) => {
        toast.error("ServerError");
      },
    }
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ ...data, user_id: currentUser.id });
    setData(initialData);
  };

  const {
    isLoading,
    error,
    data: jobPosting,
  } = useQuery(["jobs"], () =>
    makeRequest.get("/jobs/get-all-jobs").then((res) => {
      return res.data;
    })
  );

  console.log(jobPosting);

  const handleInputChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const deleteMutation = useMutation(
    (jobId) => {
      return makeRequest.delete("/jobs/" + jobId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["jobs"]);
        toast.success("Job deleted successfully");
      },
      onError: (err) => {
        toast.error("ServerError");
      },
    }
  );

  const handleDelete = (jobId) => {
    deleteMutation.mutate(jobId);
  };

  //   return (
  //       <form onSubmit={onSubmit}>
  //         <div className="p-5 bg-black min-h-[100vh]">
  //           <div>
  //             {/* Job Provider's Full Name */}
  //             <label
  //               for="job_provider_user_name"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Recruiter's Full Name
  //             </label>
  //             <input
  //               type="text"
  //               id="job_provider_user_name"
  //               name="job_provider_user_name"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="Write your full name..."
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Provider Company Name */}
  //             <label
  //               for="job_provider_company_name"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Company Name
  //             </label>
  //             <input
  //               type="text"
  //               id="job_provider_company_name"
  //               name="job_provider_company_name"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="Brain Station 23"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Provider Company Website */}
  //             <label
  //               for="job_provider_company_website"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Website
  //             </label>
  //             <input
  //               type="url"
  //               id="job_provider_company_website"
  //               name="job_provider_company_website"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="brainstation23.com"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Provider Company Linkedin */}
  //             <label
  //               for="job_provider_company_linkedin"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Official LinkedIn Page
  //             </label>
  //             <input
  //               type="url"
  //               id="job_provider_company_linkedin"
  //               name="job_provider_company_linkedin"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="https://www.linkedin.com/company/brain-station-23/"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Provider Company Twitter */}
  //             <label
  //               for="job_provider_company_twitter"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Official Twitter/X
  //             </label>
  //             <input
  //               type="url"
  //               id="job_provider_company_twitter"
  //               name="job_provider_company_twitter"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="https://twitter.com/BrainStation23"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Provider Company Facebook */}
  //             <label
  //               for="job_provider_company_facebook"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Official Facebook Page
  //             </label>
  //             <input
  //               type="url"
  //               id="job_provider_company_facebook"
  //               name="job_provider_company_facebook"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="https://www.facebook.com/brainstation23"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           {/* Job Provider Company Email */}
  //           <div className="mb-6">
  //             <label
  //               for="job_provider_company_email"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Email address
  //             </label>
  //             <input
  //               type="email"
  //               id="job_provider_company_email"
  //               name="job_provider_company_email"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="hrbrainstation23@gmail.com"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div className="mb-6">
  //             {/* Job Description */}
  //             <label
  //               for="job_description"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Job Description
  //             </label>
  //             <input
  //               type="text"
  //               id="job_description"
  //               name="job_description"
  //               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="Write down the complete job description"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div className="mb-6">
  //             {/* Job Requirement */}
  //             <label
  //               for="job_requirement"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Job Requirement
  //             </label>
  //             <input
  //               type="text"
  //               id="job_requirement"
  //               name="job_requirement"
  //               className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="Write down the complete job requirement"
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <div>
  //             {/* Job Salary */}
  //             <label
  //               for="job_salary"
  //               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  //             >
  //               Salary/Salary Range
  //             </label>
  //             <input
  //               type="text"
  //               id="job_salary"
  //               name="job_salary"
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  //               placeholder="Enter your salary range..."
  //               required={true}
  //               onChange={handleInputChange}
  //             />
  //           </div>
  //           <label
  //             for="remember"
  //             className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
  //           >
  //             I agree with the{" "}
  //             <a
  //               href="#"
  //               className="text-blue-600 hover:underline dark:text-blue-500"
  //             >
  //               terms and conditions
  //             </a>
  //             .
  //           </label>
  //         </div>
  //         <button
  //           type="submit"
  //           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //         >
  //           Submit
  //         </button>
  //       </form>

  //       // Display jobs here
  //     {jobPosting?.map((job) => {
  //       return <JobCard key = {job?.job_id} {...job} onDelete={handleDelete} />;
  //     })}
  //     </div>
  //   );
  // };

  return (
    <div className="p-5 bg-black min-h-[100vh]">
      <form onSubmit={onSubmit}>
        <div>
          {/* Job Provider's Full Name */}
          <label
            for="job_provider_user_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Recruiter's Full Name
          </label>
          <input
            type="text"
            id="job_provider_user_name"
            name="job_provider_user_name"
            value={data?.job_provider_user_name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your full name..."
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Provider Company Name */}
          <label
            for="job_provider_company_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            type="text"
            id="job_provider_company_name"
            name="job_provider_company_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Brain Station 23"
            required={true}
            value={data?.job_provider_company_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Provider Company Website */}
          <label
            for="job_provider_company_website"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Website
          </label>
          <input
            type="url"
            id="job_provider_company_website"
            name="job_provider_company_website"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="brainstation23.com"
            required={true}
            value={data?.job_provider_company_website}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Provider Company Linkedin */}
          <label
            for="job_provider_company_linkedin"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Official LinkedIn Page
          </label>
          <input
            type="url"
            id="job_provider_company_linkedin"
            name="job_provider_company_linkedin"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://www.linkedin.com/company/brain-station-23/"
            value={data?.job_provider_company_linkedin}
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Provider Company Twitter */}
          <label
            for="job_provider_company_twitter"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Official Twitter/X
          </label>
          <input
            type="url"
            id="job_provider_company_twitter"
            name="job_provider_company_twitter"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://twitter.com/BrainStation23"
            value={data?.job_provider_company_twitter}
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Provider Company Facebook */}
          <label
            for="job_provider_company_facebook"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Official Facebook Page
          </label>
          <input
            type="url"
            id="job_provider_company_facebook"
            name="job_provider_company_facebook"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://www.facebook.com/brainstation23"
            required={true}
            value={data?.job_provider_company_facebook}
            onChange={handleInputChange}
          />
        </div>
        {/* Job Provider Company Email */}
        <div className="mb-6">
          <label
            for="job_provider_company_email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="job_provider_company_email"
            name="job_provider_company_email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="hrbrainstation23@gmail.com"
            required={true}
            value={data?.job_provider_company_email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          {/* Job Description */}
          <label
            for="job_description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Description
          </label>
          <input
            type="text"
            id="job_description"
            name="job_description"
            value={data?.job_description}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write down the complete job description"
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-6">
          {/* Job Requirement */}
          <label
            for="job_requirement"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Requirement
          </label>
          <input
            type="text"
            id="job_requirement"
            name="job_requirement"
            value={data?.job_requirement}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write down the complete job requirement"
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {/* Job Salary */}
          <label
            for="job_salary"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Salary/Salary Range
          </label>
          <input
            type="text"
            id="job_salary"
            value={data?.job_salary}
            name="job_salary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your salary range..."
            required={true}
            onChange={handleInputChange}
          />
        </div>
        <button
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => setData(initialData)}
          class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </form>
      {/* Display jobs here */}
      {jobPosting?.map((job) => {
        return <JobCard key={job?.job_id} {...job} onDelete={handleDelete} />;
      })}
    </div>
  );
};

export default Job;
