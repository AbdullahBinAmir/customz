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
    const client = await pool.connect();
    try {
      const result = await client.query(`SELECT * FROM custom_inventory where qty!=$1`,[0]);

      const countResult = await client.query(`SELECT COUNT(*) FROM custom_inventory where qty!=$1`,[0]
      );
      const totalCount = parseInt(countResult.rows[0].count, 10);

      res.status(200).json({
        inventories: result.rows,
        count: totalCount
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send({ message: "Server error", error });
  }
}