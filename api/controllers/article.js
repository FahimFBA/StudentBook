import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const createArticle = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO articletable (`article_content`, `article_creation_time`, `user_id`, `article_title`) VALUES (?)";


        const values = [
            req.body.article_content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.article_title
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Article has been created!");
        });
    });
};


export const getAllArticles = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const q = "SELECT * FROM articletable";

        const q = `
            SELECT a.article_id, a.article_content, a.user_id, a.article_title, a.article_creation_time,
                   u.user_fullname, u.user_profile_img
            FROM articletable a
            INNER JOIN usertable u ON a.user_id = u.id
        `;


        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}

export const deleteOneArticle = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM articletable WHERE article_id = ?";

        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Article has been deleted!");
        });
    });
}
