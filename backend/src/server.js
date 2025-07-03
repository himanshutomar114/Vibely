import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//this is for deployment of website
import path from "path";

//for fetching data by the frontend or accepting the frontend requests
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5600;

//this is for deployment of website
const __dirname = path.resolve();


app.use(
    cors({
    origin: "http://localhost:5173",
    credentials : true  // allow frontend to send the cookies
})
);

app.use(express.json());
app.use(cookieParser());

app.get('/' , (req,res) => {
    res.send("Hello World");
});

app.use("/api/auth" , authRoutes);
app.use("/api/users" , userRoutes);
app.use("/api/chat", chatRoutes);


//this is for deployment of website
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*", (req,res) =>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
    })
}


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
    
});