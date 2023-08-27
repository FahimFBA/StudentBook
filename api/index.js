import express from "express";
const app = express()
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import articleRouter from './routes/articles.js'
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import relationshipRoutes from "./routes/relationships.js"
import jobRouter from './routes/jobs.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import searchRoutes from "./routes/searches.js";
import announcementRoutes from "./routes/announcements.js";

// middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    // update it to the address of the frontend if you get CORS blocking error
    origin: "http://localhost:5173",
}));
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"), (req, res) => {

    const file = req.file;
    res.status(200).json(file.filename);
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/articles", articleRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);
app.use("/api/searches", searchRoutes);
app.use("/api/announcements", announcementRoutes);

// our user id would be like this = currentUser.id and userInfo.id




// If you face any authentication error, run the following query in your mysql database
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234';
app.listen(8800, () => {
    console.log("API is Working!")
})