import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

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

  return (
    <form>
      <div className="p-5 bg-black min-h-[100vh]">
        <div>
          {/* Job Provider's Full Name */}
          <label
            for="job_provider_user_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Recruiter's Full Name
          </label>
          <input
            type="text"
            id="job_provider_user_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your full name..."
            required={true}
          />
        </div>
        <div>
          {/* Job Provider Company Name */}
          <label
            for="job_provider_company_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company Name
          </label>
          <input
            type="text"
            id="job_provider_company_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Brain Station 23"
            required={true}
          />
        </div>
        <div>
          {/* Job Provider Company Website */}
          <label
            for="job_provider_company_website"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Website
          </label>
          <input
            type="url"
            id="job_provider_company_website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="brainstation23.com"
            required={true}
          />
        </div>
        <div>
          {/* Job Provider Company Linkedin */}
          <label
            for="job_provider_company_linkedin"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Official LinkedIn Page
          </label>
          <input
            type="url"
            id="job_provider_company_linkedin"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://www.linkedin.com/company/brain-station-23/"
            required={true}
          />
        </div>
        {/* Job Provider Company Email */}
        <div class="mb-6">
          <label
            for="job_provider_company_email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            type="email"
            id="job_provider_company_email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="hrbrainstation23@gmail.com"
            required={true}
          />
        </div>
        <div class="mb-6">
          {/* Job Description */}
          <label
            for="job_description"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Description
          </label>
          <input
            type="text"
            id="job_description"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write down the complete job description"
            required={true}
          />
        </div>
        <div class="mb-6">
          {/* Job Requirement */}
          <label
            for="job_requirement"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Job Requirement
          </label>
          <input
            type="text"
            id="job_requirement"
            class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write down the complete job requirement"
            required={true}
          />
        </div>
        <div>
          <label
            for="company"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Flowbite"
            required={true}
          />
        </div>
        <div>
          <label
            for="phone"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <input
            type="tel"
            id="phone"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            required={true}
          />
        </div>
        <div>
          <label
            for="website"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Website URL
          </label>
          <input
            type="url"
            id="website"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="flowbite.com"
            required={true}
          />
        </div>
        <div>
          <label
            for="visitors"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Unique visitors (per month)
          </label>
          <input
            type="number"
            id="visitors"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required={true}
          />
        </div>
      </div>
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="john.doe@company.com"
          required={true}
        />
      </div>
      <div class="mb-6">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required={true}
        />
      </div>
      <div class="mb-6">
        <label
          for="confirm_password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          id="confirm_password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required={true}
        />
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            required={true}
          />
        </div>
        <label
          for="remember"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">
            terms and conditions
          </a>
          .
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Job;
