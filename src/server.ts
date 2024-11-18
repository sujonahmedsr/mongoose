import app from "./app"
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()

const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

async function main() {
    await mongoose.connect(databaseUrl as string);
    app.listen(port, () => {
        console.log(`Example apps listening on port ${port}`)
    })
}

main()

