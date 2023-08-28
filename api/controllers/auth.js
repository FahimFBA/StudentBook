import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {

    // checking if the same user already exists in our database or not.
    // If yes, then we are going to give an error
    // If no, then we are going to create a new user account for him/her


    // CHECK USER IF EXISTS

    const q = "SELECT * FROM usertable WHERE user_name = ?"

    db.query(q, [req.body.user_name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!")

        // CREATE A NEW USER
        // HASH THE PASSWORD
        // we are going to hash a normal password to random text like below
        // 123456 => "askjlbhfioquwbjaknsgvigal89wrtfhbajknvajksngkasdnf"


        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.user_password, salt);

        const q = "INSERT INTO usertable (`user_name`, `user_fullname`, `user_email`,  `user_occ`, `user_password`) VALUE (?)"

        const values = [
            req.body.user_name,
            req.body.user_fullname,
            req.body.user_email,
            req.body.user_occ,
            hashedPassword
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created successfully!");
        });
    });







};


export const login = (req, res) => {

    const q = "SELECT * FROM usertable WHERE user_name = ?"

    const { user_name, user_password } = req.body

    db.query(q, [user_name], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const checkPassword = bcrypt.compareSync(user_password, data[0].user_password);

        if (!checkPassword) return res.status(400).json("Wrong password or username!");

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0]

        res.cookie("accessToken", token, {
            httpOnly: true,
        })
            .status(200).json(others);

    });
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out!")
};