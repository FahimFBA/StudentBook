import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const createJob = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const q = "INSERT INTO jobtable (`job_provider_user_name`, `job_provider_company_name`, `job_provider_company_linkedin`, `job_provider_company_website`, `job_provider_company_email`, `job_description`, `job_requirement`, `job_salary`, `job_provider_company_twitter`, `job_provider_company_facebook`, `user_id`, `job_creation_time`) VALUES (?)";


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

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Job has been created!");
        });
    });
};



export const getAllJobs = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");


        const q = `
                SELECT j.job_id, j.job_provider_user_name, j.job_provider_company_name, j.job_provider_company_linkedin, j.job_provider_company_website, j.job_provider_company_email, j.job_description, j.job_requirement, j.job_salary, j.job_provider_company_twitter, j.job_provider_company_facebook, j.user_id, j.job_creation_time,
                    u.user_fullname, u.user_profile_img
                FROM jobtable j
                INNER JOIN usertable u ON j.user_id = u.id
            `;

        db.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        }
        );


    });
};


export const deleteOneJob = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Check if the job exists and belongs to the authenticated user
        const jobId = req.params.id;
        const checkQuery = "SELECT user_id FROM jobtable WHERE job_id = ?";
        db.query(checkQuery, [jobId], (checkErr, checkData) => {
            if (checkErr) return res.status(500).json(checkErr);

            if (checkData.length === 0) {
                return res.status(404).json("Job not found");
            }

            const jobUserId = checkData[0].user_id;

            if (userInfo.id !== jobUserId) {
                return res.status(403).json("You do not have permission to delete this job");
            }

            // If the user is authorized, proceed with the deletion
            const deleteQuery = "DELETE FROM jobtable WHERE job_id = ?";
            db.query(deleteQuery, [jobId], (deleteErr, deleteData) => {
                if (deleteErr) return res.status(500).json(deleteErr);
                return res.status(200).json("Job has been deleted!");
            });
        });
    });
}
