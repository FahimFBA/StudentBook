import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

const youtubeIdPattern = /^[a-zA-Z0-9_-]{11}$/;

const getYoutubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return parsedUrl.pathname.slice(1);
    if (host.endsWith("youtube.com")) {
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2];
      }
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/")[2];
      }
      return parsedUrl.searchParams.get("v");
    }
  } catch {
    return "";
  }

  return "";
};

const buildVideoFields = (body) => {
  const videoUrl = body.video_url?.trim();
  const videoId = getYoutubeVideoId(videoUrl);

  if (!videoId || !youtubeIdPattern.test(videoId)) return null;

  return {
    video_title: body.video_title?.trim(),
    video_description: body.video_description?.trim() || "",
    video_url: `https://www.youtube.com/watch?v=${videoId}`,
    video_embed_url: `https://www.youtube.com/embed/${videoId}`,
    video_thumbnail_url:
      body.video_thumbnail_url?.trim() || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  };
};

export const createVideo = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const video = buildVideoFields(req.body);
    if (!video?.video_title) {
      return res.status(400).json("A valid YouTube video URL and title are required.");
    }

    const q =
      "INSERT INTO videotable (`video_title`, `video_description`, `video_url`, `video_embed_url`, `video_thumbnail_url`, `user_id`, `video_creation_time`) VALUES (?)";
    const values = [
      video.video_title,
      video.video_description,
      video.video_url,
      video.video_embed_url,
      video.video_thumbnail_url,
      userInfo.id,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
    ];

    db.query(q, [values], (queryErr) => {
      if (queryErr) return res.status(500).json(queryErr);
      return res.status(200).json("Video has been created!");
    });
  });
};

export const getAllVideos = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `
      SELECT v.video_id, v.video_title, v.video_description, v.video_url,
             v.video_embed_url, v.video_thumbnail_url, v.user_id, v.video_creation_time,
             u.user_fullname, u.user_profile_img
      FROM videotable v
      INNER JOIN usertable u ON v.user_id = u.id
      ORDER BY v.video_creation_time DESC
    `;

    db.query(q, (queryErr, data) => {
      if (queryErr) return res.status(500).json(queryErr);
      return res.status(200).json(data);
    });
  });
};

export const deleteOneVideo = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM videotable WHERE `video_id`=? AND `user_id`=?";

    db.query(q, [req.params.id, userInfo.id], (queryErr, data) => {
      if (queryErr) return res.status(500).json(queryErr);
      if (data.affectedRows > 0) return res.status(200).json("Video has been deleted!");
      return res.status(403).json("You can delete only your video");
    });
  });
};
