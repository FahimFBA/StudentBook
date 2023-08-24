import React, { useContext, useState } from "react";
import "./Article.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";

const Article = () => {
  const initialData = {
    article_content: "",
  };
  const [data, setData] = useState(initialData);

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (x) => {
      return makeRequest.post("/articles", x);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["articles"]);
        toast.success("Article posted successfully");
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
    <div className="p-5 bg-black min-h-[100vh]">
      <form onSubmit={onSubmit}>
        <label
          for="article_content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Wisdom
        </label>
        <textarea
          name="article_content"
          id="article_content"
          value={data?.article_content}
          onChange={(e) =>
            setData({ ...data, article_content: e.target.value })
          }
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
          cols={30}
          rows={4}
        ></textarea>
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

      {/*  Display articles here */}

      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg
              className="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            Tutorial
          </span>
          <span className="text-sm">14 days ago</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <a href="#">How to quickly deploy a static website</a>
        </h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
          Static websites are now used to bootstrap lots of websites and are
          becoming the basis for a variety of tools that even influence both web
          designers and developers influence both web designers and developers.
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              className="w-7 h-7 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="Jese Leos avatar"
            />
            <span className="font-medium dark:text-white">Jese Leos</span>
          </div>
          <a
            href="#"
            className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </article>
    </div>
  );
};

export default Article;
