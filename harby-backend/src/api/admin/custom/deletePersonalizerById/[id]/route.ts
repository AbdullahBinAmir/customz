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

export async function DELETE(req: Request, res: Response) {
    try {
        const { id } = req.params;

        // Check if 'id' is provided in the request parameters
        if (!id) {
            return res.status(400).json({ error: 'Missing ID in the request parameters' });
        }

        // Check if the record exists before attempting to delete
        const fetchDataResult = await pool.query('SELECT * FROM "customizer" WHERE "id" = $1', [id]);

        // Check if a record was found
        if (fetchDataResult.rows.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        // Delete record from "customizer" table
        await pool.query('DELETE FROM "customizer" WHERE "id" = $1', [id]);

        // Delete associated icons from "icons" table
        await pool.query('DELETE FROM "icons" WHERE "customizable_product_id" = $1', [id]);

        return res.status(200).json({ message: 'Customizable Product deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}