import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

// Image upload problem

const Share = () => {
  const [file, setFile] = useState(null);
  console.log(file);
  const [post_desc, setPostDesc] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const previewUrlRef = useRef("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = use(AuthContext);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const revokePreviewUrl = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = "";
    }
    setPreviewUrl("");
  };

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0] || null;
    revokePreviewUrl();
    setFile(nextFile);

    if (nextFile) {
      const nextPreviewUrl = URL.createObjectURL(nextFile);
      previewUrlRef.current = nextPreviewUrl;
      setPreviewUrl(nextPreviewUrl);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ post_desc, img: imgUrl });
    setPostDesc("");
    setFile(null);
    revokePreviewUrl();
  };

  return (
    <form onSubmit={handleClick} className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.user_profile_img} alt="" />
            <input
              type="text"
              value={post_desc}
              placeholder={`What's on your mind, ${currentUser.user_fullname}?`}
              onChange={(e) => setPostDesc(e.target.value)}
              required
            />
          </div>
          <div className="right">
            {previewUrl && (
              <img
                style={{
                  height: "200px",
                  width: "200px",
                }}
                className="file"
                alt=""
                src={previewUrl}
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              // value={file}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button type="submit">Share</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Share;
