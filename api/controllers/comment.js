import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getComments = (req, res) => {



    // const q = `SELECT c.*, u.id AS userId, user_name, user_profile_img 
    //     FROM commentstable AS c 
    //     JOIN usertable as u ON u.id = p.user_id 
    //     JOIN userrelationshiptable AS r ON p.user_id = r.followeduserid AND r.followeruserid = ?
    //     WHERE c.post_id = ?
    //     ORDER BY c.post_creation_time DESC;
    //     `;


    const q = `SELECT c.*, u.id AS userId, user_name, user_profile_img FROM commentstable AS c JOIN usertable AS u ON (u.id = c.user_id)
    WHERE c.post_id = ? ORDER BY c.comment_creation_time DESC
    `;

    // const q = `SELECT c.*, u.id AS userId, 
    // user_name, user_profile_img FROM commentstable
    // AS c JOIN usertable as u ON (u.id = c.user_id)
    // WHERE c.post_id = ? ORDER BY 
    // c.comment_creation_time DESC`;





    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}
