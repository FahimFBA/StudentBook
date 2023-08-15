import { db } from "../connect.js"

export const getPosts = (req, res) => {
    const q = `SELECT p.*, u.id AS userId, user_name, user_profile_img FROM poststable AS p JOIN usertable as u ON (u.id = p.user_id)`


    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err)
        return res.status(200).json(data)
    })
}