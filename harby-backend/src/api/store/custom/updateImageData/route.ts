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

export async function POST(req: Request, res: Response) {
    const { id, metadata } = req.body;

    try {
        const query = `
          UPDATE public.image
          SET metadata = $1, updated_at = now()
          WHERE id = $2;
        `;
        const values = [metadata, id];
        
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ message: 'Metadata updated successfully!' });
    } catch (error) {
        console.error('Error updating metadata:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
