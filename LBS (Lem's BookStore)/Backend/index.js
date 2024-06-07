import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';


const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//Middleware for handling CORS (for using in different URLS) (only if needed)
//Option 1: allow all origins with default of cors(*) 
app.use(cors());
//Option 2: Allowing Custom Origins. in this case, https://localhost:3000
//app.use(
   // cors({
      //  origin: 'https://localhost:5173',
        //methods:   ['GET', 'POST', 'PUT', 'DELETE'],
       //allowedHeaders: ['Content-Type'],
  //  })
//);

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("MERN TEST");
});


app.use('/books', booksRoute);


mongoose
  .connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // Add connection options
  .then(() => {
    console.log("App is connected");
    app.listen(PORT, () => {
      console.log(`App is listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error:", error.message);
  });
