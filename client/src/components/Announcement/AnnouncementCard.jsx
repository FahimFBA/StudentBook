import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const AnnouncementCard = ({
  announcement_title,
  announcement_content,
  announcement_creation_time,
  user_fullname,
  announcement_id,
  user_profile_img,
  onDelete,
}) => {
  return (
    <announcement className="my-2 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <TrashIcon
        onClick={() => onDelete(announcement_id)}
        className="h-6 text-red-600"
      />
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
          Announcement
        </span>
        <span className="text-sm">{announcement_creation_time}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <a href="#">{announcement_title}</a>
      </h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
        {announcement_content}
      </p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            className="w-7 h-7 rounded-full"
            src={user_profile_img}
            alt="user profile picture"
          />
          <span className="font-medium dark:text-white">{user_fullname}</span>
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
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z"
            ></path>
          </svg>
        </a>
      </div>
    </announcement>
  );
};

export default AnnouncementCard;
