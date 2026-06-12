import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const searchByUserName = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const searchTerm = req.params.search?.trim();

        if (!searchTerm) return res.status(200).json([]);

        const q = `SELECT ut.*, st.student_cgpa
        FROM usertable ut
        LEFT JOIN studenttable st ON ut.user_if_student_id = st.student_id
        WHERE ut.user_fullname LIKE ?
        OR ut.user_name LIKE ?
        OR CAST(st.student_cgpa AS CHAR) LIKE ?
        ORDER BY ut.user_fullname ASC
        LIMIT 8
        `

        const searchValue = `%${searchTerm}%`;

        db.query(q, [searchValue, searchValue, searchValue], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });

    });
}
