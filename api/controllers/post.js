import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getPosts = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img FROM poststable AS p JOIN usertable as u ON (u.id = p.user_id) 
        // LEFT JOIN userrelationshiptable AS r ON (p.user_id = r.followeduserid) WHERE r.followeruserid= ? OR p.userId =?`;

        // const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img FROM poststable AS p JOIN usertable as u ON (u.id = p.user_id) 
        // JOIN userrelationshiptable AS r ON (p.user_id = r.followeduserid AND r.followeruserid= ?)`; // this shouldn't be used. I need to use the upper one


        const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img 
        FROM poststable AS p 
        JOIN usertable as u ON u.id = p.user_id 
        JOIN userrelationshiptable AS r ON p.user_id = r.followeduserid AND r.followeruserid = ?
        UNION
        SELECT p.*, u.id AS userId, user_name, user_profile_img 
        FROM poststable AS p 
        JOIN usertable as u ON u.id = p.user_id 
        WHERE p.user_id = ?
        ORDER BY post_creation_time DESC;
        `;



        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
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

        // const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img FROM poststable AS p JOIN usertable as u ON (u.id = p.user_id) 
        // LEFT JOIN userrelationshiptable AS r ON (p.user_id = r.followeduserid) WHERE r.followeruserid= ? OR p.userId =?`;

        // const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img FROM poststable AS p JOIN usertable as u ON (u.id = p.user_id) 
        // JOIN userrelationshiptable AS r ON (p.user_id = r.followeduserid AND r.followeruserid= ?)`; // this shouldn't be used. I need to use the upper one


        // const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img 
        // FROM poststable AS p 
        // JOIN usertable as u ON u.id = p.user_id 
        // JOIN userrelationshiptable AS r ON p.user_id = r.followeduserid AND r.followeruserid = ?
        // UNION
        // SELECT p.*, u.id AS userId, user_name, user_profile_img 
        // FROM poststable AS p 
        // JOIN usertable as u ON u.id = p.user_id 
        // WHERE p.user_id = ?
        // ORDER BY post_creation_time DESC;
        // `;

        const q = "INSERT INTO poststable (`post_desc`, `img`, `post_creation_time`, `user_id`) VALUES (?)";


        const values = [
            req.body.post_desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created!");
        });
    });
};