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

export async function GET(req: any, res: Response) {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const pageSize = parseInt(req.query.pageSize) || 10; // Default to 10 items per page if not provided
  
    const offset = (page - 1) * pageSize;
  
    try {
      // Query to get total count of items
      const countQuery = 'SELECT COUNT(*) FROM public.subscription';
      const countResult = await pool.query(countQuery);
      const totalItems = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalItems / pageSize);
  
      // Query to get paginated results
      const query = 'SELECT * FROM public.subscription ORDER BY created_at DESC LIMIT $1 OFFSET $2';
      const values = [pageSize, offset];
      const result = await pool.query(query, values);
  
      res.status(200).json({
        page,
        pageSize,
        totalItems,
        totalPages,
        items: result.rows
      });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}