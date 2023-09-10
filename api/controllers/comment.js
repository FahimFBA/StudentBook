import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";


export const getComments = (req, res) => {


    const q = `SELECT c.*, u.id AS userId, user_name, user_profile_img FROM commentstable AS c JOIN usertable AS u ON (u.id = c.user_id)
    WHERE c.post_id = ? ORDER BY c.comment_creation_time DESC
    `;

    db.query(q, [req.query.post_id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}


export const addComment = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO commentstable (`comment_desc`, `comment_creation_time`, `user_id`, `post_id`) VALUES (?)";


        const values = [
            req.body.comment_desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.post_id
        ];



        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created!");
        });
    });
};


export const deleteComment = (req, res) => {
    const token = req.cookies.accessToken;
    
    if (!token) {
        return res.status(401).json("Not logged in!");
    }

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }

        const commentId = req.params.commentId; // Assuming you pass the comment ID in the URL

        // Check if the user has permission to delete the comment, e.g., they are the owner of the comment
        const checkOwnershipQuery = "SELECT user_id FROM commentstable WHERE id = ?";
        
        db.query(checkOwnershipQuery, [commentId], (err, commentData) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (commentData.length === 0) {
                return res.status(404).json("Comment not found");
            }

            const commentUserId = commentData[0].user_id;

            // Check if the user making the request is the owner of the comment
            if (userInfo.id !== commentUserId) {
                return res.status(403).json("You don't have permission to delete this comment");
            }

            // If the user has permission, proceed with the deletion
            const deleteQuery = "DELETE FROM commentstable WHERE id = ?";

            db.query(deleteQuery, [commentId], (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                return res.status(200).json("Comment has been deleted!");
            });
        });
    });
};
