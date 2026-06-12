import "./share.scss";
import Image from "../../assets/img.png";
import { use, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
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
            <img
              src={"/upload/" + currentUser.user_profile_img}
              alt={currentUser.user_fullname}
            />
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
          </div>
          <div className="right">
            <button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Share;
