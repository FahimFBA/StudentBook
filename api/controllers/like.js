import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {

    const q = "SELECT user_id FROM likestable WHERE post_id = ?";

    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like => like.user_id));
    });
}


export const addLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO likestable (`user_id`,`post_id`) VALUES (?)";

        const values = [
            userInfo.id,
            req.body.post_id
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been liked!");
        });
    });
};


export const deleteLike = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM likestable WHERE `user_id` = ? AND `post_id` = ?";

        db.query(q, [userInfo.id, req.query.post_id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been disliked!");
        });
    });
};