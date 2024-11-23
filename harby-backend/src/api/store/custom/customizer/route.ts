import { Request, Response } from "express";
import dotenv from 'dotenv';
import * as pg from "pg";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

export async function POST(req: Request, res: Response) {
    try {
        // const files = req.files; // Use req.files to access the array of files
    
        // const { name } = req.body;
    
        // if (!files || files.length === 0) {
        //   return res.status(400).send("No files uploaded.");
        // }
    
        // // Customize the folder where you want to save the uploaded files
        // const date = new Date();
        // const fdate = date.toISOString().replace(/[:.]/g, "-");
    
        // // Assuming all files have the same extension, adjust as needed
        // const extension = ".png";
    
        const insertedData = [];
    
        // for (const file of files) {
        //   const filename = `uploads/customizerIcon-${fdate}${extension}`;
        //   await fs.outputFile(filename, file.buffer);
    
        //   // Construct the URL using req.protocol and req.get('host')
        //   const url = `${req.protocol}://${req.get("host")}/${filename}`;
        //   console.log("url",url)
        //   // Insert data into the PostgreSQL database
        //   const result = await pool.query(
        //     "INSERT INTO customizer (name, url) VALUES ($1, $2) RETURNING *",
        //     [name, url]
        //   );
    
        //   insertedData.push(result.rows[0]);
        // }
    
        // Respond with the URLs and any additional parameters
        res.json({ message: "Images saved", data: insertedData });
      } catch (error) {
        console.error("Error in customizer:", error);
        res.status(500).json({ error: "Internal server error" });
      }
}