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
    const { price, cart_id } = req.body;

    try {
        const queryText = `
            UPDATE public.shipping_method
            SET price = $1
            WHERE cart_id = $2;
        `;
        const values = [price, cart_id];

        // Execute the update query
        const result = await pool.query(queryText, values);

        if (result.rowCount > 0) {
            res.json({ message: "Shipping price updated successfully" });
        } else {
            res.status(404).json({ error: "Cart ID not found" });
        }
    } catch (error) {
        console.error("Error updating shipping price:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}