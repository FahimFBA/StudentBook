import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const createJob = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // const q = "INSERT INTO articletable (`article_content`, `article_creation_time`, `user_id`, `article_title`) VALUES (?)";

        // insert into these:
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",
        // : "",

        const q = "INSERT INTO jobtable (`job_provider_user_name`, `job_provider_company_name`, `job_provider_company_linkedin`, `job_provider_company_website`, `job_provider_company_email`, `job_description`, `job_requirement`, `job_salary`, `job_provider_company_twitter`, `job_provider_company_facebook`, `user_id`, `job_creation_time`) VALUES (?)";
        // const values = [
        //     req.body.article_content,
        //     moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        //     userInfo.id,
        //     req.body.article_title
        // ];

        const values = [
            req.body.job_provider_user_name,
            req.body.job_provider_company_name,
            req.body.job_provider_company_linkedin,
            req.body.job_provider_company_website,
            req.body.job_provider_company_email,
            req.body.job_description,
            req.body.job_requirement,
            req.body.job_salary,
            req.body.job_provider_company_twitter,
            req.body.job_provider_company_facebook,
            userInfo.id,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        ];



        // db.query(q, [values], (err, data) => {
        //     if (err) return res.status(500).json(err);
        //     return res.status(200).json("Article has been created!");
        // });

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Job has been created!");
        });
    });
};