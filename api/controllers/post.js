import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {

    const userId = req.query.userId;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        console.log(userId)

        const q = userId !== "undefined"
            ? `SELECT p.*, u.id AS userId, user_name, user_profile_img 
           FROM poststable AS p 
           JOIN usertable AS u ON u.id = p.user_id 
           WHERE p.user_id = ? 
           ORDER BY p.post_creation_time DESC`
            : `SELECT p.*, u.id AS userId, user_name, user_profile_img 
           FROM poststable AS p 
           JOIN usertable AS u ON u.id = p.user_id 
           LEFT JOIN userrelationshiptable AS r ON p.user_id = r.followeduserid AND r.followeruserid = ? 
           WHERE r.followeruserid IS NULL OR p.user_id = ? 
           ORDER BY p.post_creation_time DESC`;

        const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};


export const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO poststable (`post_desc`, `img`, `post_creation_time`, `user_id`, `user_fullname`) VALUES (?, ?, ?, ?, ?)";

        // Fetch user_fullname from usertable using userInfo.id
        const getUserFullnameQuery = "SELECT `user_fullname` FROM usertable WHERE `id` = ?";
        db.query(getUserFullnameQuery, [userInfo.id], (getUserErr, userResult) => {
            if (getUserErr) return res.status(500).json(getUserErr);

            const values = [
                req.body.post_desc,
                req.body.img,
                moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userInfo.id,
                userResult[0].user_fullname  // Get the user_fullname from the query result
            ];

            db.query(q, values, (postErr, data) => {
                if (postErr) return res.status(500).json(postErr);
                return res.status(200).json("Post has been created!");
            });
        });
    });
};





export const deletePost = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM poststable WHERE `post_id`=? AND `user_id`=?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("Post has been deleted!");
            return res.status(403).json("You can delete only your post");
        });
    });
};