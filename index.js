import app from "./app.js";
import { config } from "dotenv";

config({
    path: './.env'
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})