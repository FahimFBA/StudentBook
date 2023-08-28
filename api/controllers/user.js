import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM usertable WHERE id=?"

    db.query(q, [userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0] || {};
        return res.json(info);
    })
}


export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE usertable SET `user_fullname`=?, `user_city`=?, `user_website`=?, `user_profile_img`=?, `user_cover_img`=? WHERE id=?"

        db.query(q, [
            req.body.user_fullname,
            req.body.user_city,
            req.body.user_website,
            req.body.user_profile_img,
            req.body.user_cover_img,
            userInfo.id
        ], (err, data) => {
            if (err) res.status(500).json(err)
            if (data.affectedRows > 0) return res.json("Updated!")
            return res.status(403).json("You can update only your post!")
        });
    });
}