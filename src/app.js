import express from 'express';
import cors from 'cors' // for authentication of request from the server
import cookieParser from "cookie-parser"

const app= express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// configuration. 
app.use(express.json({limit: "16kb"})) // accepting json file request from frontend
app.use(express.urlencoded({extended: true,limit: "16kb"}))// setting urlencoded 
app.use(express.static("public"))// making a public folder for storing file and folder of images etc. 
app.use(cookieParser()) // making our server ready to access browser cookies and set up the cookies inside user browser.


export  { app };