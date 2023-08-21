import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {

    const q = "SELECT user_id FROM likestable WHERE post_id = ?";

    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(like=>like.user_id));
    });
}
