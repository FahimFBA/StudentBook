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

        const q = `SELECT a.announcement_id, a.announcement_content, 
        a.announcement_creation_time, a.announcement_title, 
        a.user_id, u.user_fullname, u.user_profile_img FROM announcementtable a 
        INNER JOIN usertable u ON a.user_id = u.id ORDER BY a.announcement_creation_time DESC`;

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

        // Check if the announcement exists and belongs to the authenticated user
        const announcementId = req.params.id;
        const checkQuery = "SELECT user_id FROM announcementtable WHERE announcement_id = ?";
        db.query(checkQuery, [announcementId], (checkErr, checkData) => {
            if (checkErr) return res.status(500).json(checkErr);

            if (checkData.length === 0) {
                return res.status(404).json("Announcement not found");
            }

            const announcementUserId = checkData[0].user_id;

            if (userInfo.id !== announcementUserId) {
                return res.status(403).json("You do not have permission to delete this announcement");
            }

            // If the user is authorized, proceed with the deletion
            const deleteQuery = "DELETE FROM announcementtable WHERE announcement_id = ?";
            db.query(deleteQuery, [announcementId], (deleteErr, deleteData) => {
                if (deleteErr) return res.status(500).json(deleteErr);
                return res.status(200).json("Announcement has been deleted!");
            });
        });
    });
}
