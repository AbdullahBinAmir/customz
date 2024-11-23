import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

export async function GET(req: Request, res: Response) {
    try {
        // Query to select data from "customizer" table and associated icons
        const result = await pool.query(`
          SELECT
            c.id as customizable_product_id,
            c.name as customizable_product_name,
            c.thumbnail as customizable_product_thumbnail,
            i.id as icon_id,
            i.url as icon_url
          FROM
            customizer c
          LEFT JOIN
            icons i ON c.id = i.customizable_product_id
        `);

        // Organize the data into a more structured format
        const customizerData = {};
        result.rows.forEach((row) => {
            const { customizable_product_id, customizable_product_name, customizable_product_thumbnail, icon_id, icon_url } = row;

            if (!customizerData[customizable_product_id]) {
                customizerData[customizable_product_id] = {
                    id: customizable_product_id,
                    name: customizable_product_name,
                    thumbnail: customizable_product_thumbnail,
                    icons: [],
                };
            }

            if (icon_id) {
                customizerData[customizable_product_id].icons.push({
                    id: icon_id,
                    url: icon_url,
                });
            }
        });

        // Convert the object into an array for the final response
        const finalData = Object.values(customizerData);

        // Respond with the retrieved data
        res.json({ data: finalData });
    } catch (error) {
        console.error("Error in getCustomizerData:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}