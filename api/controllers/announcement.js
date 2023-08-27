import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const createAnnouncement = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const q = "INSERT INTO announcementtable (`announcement_content`, `announcement_creation_time`, `announcement_title`, `user_id`) VALUES (?)";

        const values = [
            req.body.announcement_content,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            req.body.announcement_title,
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Announcement has been created!");
        });
    }
    );
};



export const getAllAnnouncements = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // also make sure to descend order by announcement_creation_time
        const q = `SELECT * FROM announcementtable ORDER BY announcement_creation_time DESC`;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}



export const deleteOneAnnouncement = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM announcementtable WHERE announcement_id = ?";
        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Announcement has been deleted!");
        });
    });
}