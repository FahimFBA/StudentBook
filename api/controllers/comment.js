import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getComments = (req, res) => {


    const q = `SELECT c.*, u.id AS userId, user_name, user_profile_img FROM commentstable AS c JOIN usertable AS u ON (u.id = c.user_id)
    WHERE c.post_id = ? ORDER BY c.comment_creation_time DESC
    `;

    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}


export const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO commentstable (`comment_desc`, `comment_creation_time`, `user_id`, `post_id`) VALUES (?)";


        const values = [
            req.body.comment_desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.post_id
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created!");
        });
    });
};