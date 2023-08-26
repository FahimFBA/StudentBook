import React, { useContext, useState } from "react";
import "./Article.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { makeRequest } from "../../axios";
import ArticleCard from "../../components/Article/ArticleCard";

const Article = () => {
  const initialData = {
    article_content: "",
    article_title: "",
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

  const {
    isLoading,
    error,
    data: articleData,
  } = useQuery(["articles"], () =>
    makeRequest.get("/articles/get-all-articles").then((res) => {
      return res.data;
    })
  );

  const handleInputChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const deleteMutation = useMutation(
    (articleId) => {
      return makeRequest.delete("/articles/" + articleId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["articles"]);
        toast.success("Article deleted successfully");
      },  
      onError: (err) => {
        toast.error("ServerError");
      }
    }
  );

  const handleDelete = (articleId) => {
    deleteMutation.mutate(articleId);
  };

  return (
    <div className="p-5 bg-black min-h-[100vh]">
      <form onSubmit={onSubmit}>
        <div>
          <label
            for="article_title"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Article title
          </label>
          <input
            type="text"
            id="article_title"
            name="article_title"
            value={data?.article_title}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="article title"
            required={true}
            onChange={handleInputChange}
          />
        </div>
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
          onChange={handleInputChange}
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

      {articleData?.map((item) => {
        return <ArticleCard key={item?.article_id} {...item} onDelete={handleDelete} />;
      })}
    </div>
  );
};

export default Article;
