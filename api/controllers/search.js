import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

// my job is to find the user by user_name from my usertable database table
export const searchByUserName = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // my job is to get the title from various datat table

        // const q = "SELECT * FROM usertable WHERE user_fullname LIKE ?";

        const q = `SELECT ut.*, st.student_cgpa
        FROM usertable ut
        LEFT JOIN studenttable st ON ut.user_if_student_id = st.student_id
        WHERE ut.user_fullname LIKE ?
        `


        db.query(q, [req.params.search + "%"], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });

    });
}