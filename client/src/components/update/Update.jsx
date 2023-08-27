import React, { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputField from "../Form/InputField";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Update = ({ setOpenUpdate, user }) => {
  console.log("fahim", user);
  const [updateData, setUpdateData] = useState(user);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) =>
    setUpdateData((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = updateData?.user_cover_img ? await upload(updateData?.user_cover_img) : user.user_cover_img;
    profileUrl = updateData?.user_profile_img ? await upload(updateData?.user_profile_img) : user.user_profile_img;

    mutation.mutate({
      ...updateData,
      user_cover_img: coverUrl,
      user_profile_img: profileUrl,
    });
    setOpenUpdate(false);
  };

  return (
    <div className="update bg-slate-600">
      <div className="flex justify-between mb-4">
        <div className="text-2xl text-white">Update</div>
        <XMarkIcon className="close h-6" onClick={() => setOpenUpdate(false)} />
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          onChange={(e) =>
            setUpdateData((prev) => ({
              ...prev,
              user_cover_img: e.target.files[0],
            }))
          }
          name="user_cover_img"
          label="Cover Image"
          // value={updateData?.user_cover_img}
          type="file"
        />
        <InputField
          onChange={(e) =>
            setUpdateData((prev) => ({
              ...prev,
              user_profile_img: e.target.files[0],
            }))
          }
          name="user_profile_img"
          label="Profile Image"
          // value={updateData?.user_profile_img}
          type="file"
        />
        <InputField
          onChange={handleChange}
          name="user_fullname"
          label="Full Name"
          value={updateData?.user_fullname}
          type="text"
        />
        <InputField
          onChange={handleChange}
          name="user_city"
          label="City"
          value={updateData?.user_city}
          type="text"
        />
        <InputField
          onChange={handleChange}
          name="user_website"
          label="Website"
          value={updateData?.user_website}
          type="text"
        />

        <button
          type="submit"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
