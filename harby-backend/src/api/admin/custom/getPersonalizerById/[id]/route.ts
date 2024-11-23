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
        const { id } = req.params;

        // Query to select a specific record from the "customizer" table based on the id
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
          WHERE
            c.id = $1
        `, [id]);

        // Retrieve the rows from the result
        const rows = result.rows;

        // Check if a record was found
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Organize the data into a more structured format
        const customizerData = {
            id: rows[0].customizable_product_id,
            name: rows[0].customizable_product_name,
            thumbnail: rows[0].customizable_product_thumbnail,
            icons: [],
        };

        // Populate the icons array
        rows.forEach((row) => {
            if (row.icon_id) {
                customizerData.icons.push({
                    id: row.icon_id,
                    url: row.icon_url,
                });
            }
        });

        // Respond with the retrieved data
        res.json({ data: customizerData });
    } catch (error) {
        console.error('Error in getCustomizerData:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}