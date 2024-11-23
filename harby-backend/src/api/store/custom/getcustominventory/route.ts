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
  const { offset = 0, limit = 15, query = "" } = req.query; // Default values for offset and limit

  try {
    const client = await pool.connect();
    try {
      // Dynamic SQL query to handle search, pagination
      const searchQuery = `%${query}%`;
      const result = await client.query(
        `
          SELECT * 
          FROM custom_inventory
          WHERE color ILIKE $1 OR type ILIKE $1
          ORDER BY id DESC
          LIMIT $2 OFFSET $3
        `,
        [searchQuery, limit, offset]
      );

      const countResult = await client.query(
        `
          SELECT COUNT(*) 
          FROM custom_inventory 
          WHERE color ILIKE $1 OR type ILIKE $1
        `,
        [searchQuery]
      );

      const totalCount = parseInt(countResult.rows[0].count, 10);

      res.status(200).json({
        inventories: result.rows,
        count: totalCount,
        offset: parseInt(offset as string, 10),
        limit: parseInt(limit as string, 10),
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ message: "Server error", error });
  }
}