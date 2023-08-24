import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const createArticle = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO articletable (`article_content`, `article_creation_time`, `user_id`) VALUES (?)";


        const values = [
            req.body.article_content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Article has been created!");
        });
    });
};
