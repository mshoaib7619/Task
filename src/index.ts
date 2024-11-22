import express from "express";
import auth from "./routes/auth";
import {DBConnection} from "./config/db";

const PORT = 5000
const app = express();
app.use(express.json());

DBConnection.initialize().then(()=>{
    console.log("DB connect Successfully")
})
.catch((error)=>{
    console.log("DB Connection Failed",error)
});

app.use("/api", auth);


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
