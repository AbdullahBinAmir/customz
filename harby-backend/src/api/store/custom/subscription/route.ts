import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
  connectionString,
  max: 100,
});

export async function POST(req: Request, res: Response) {
  const { email } = req.body;

  try {
    const query = `
          INSERT INTO public.subscription(
            id,  email)
          VALUES (
            uuid_in(md5(random()::text || now()::text)::cstring), $1
          );
        `;
    const values = [email];
    await pool.query(query, values);
    res.status(201).json({ message: "email added created successfully!" });
  } catch (error) {
    console.error("Error inserting email added:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function GET(req: Request, res: Response) {
  const { id } = req.query;

  try {
    const query = "SELECT * FROM public.subscription WHERE id = $1";
    const values = [id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "email not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function PUT(req: Request, res: Response) {
  const { id, email } = req.body;

  try {
    // Fetch existing record
    const fetchQuery = "SELECT * FROM public.subscription WHERE id = $1";
    const fetchResult = await pool.query(fetchQuery, [id]);

    if (fetchResult.rows.length === 0) {
      return res.status(404).json({ error: "email not found" });
    }

    const existingOrder = fetchResult.rows[0];

    // Update only the fields provided
    const updatedOrder = {
      email: email || existingOrder.email,
    };

    const query = `
          UPDATE public.subscription
          SET  email = $1, 
          WHERE id = $2
        `;
    const values = [updatedOrder.email, id];
    await pool.query(query, values);
    res.status(200).json({ message: "email updated successfully!" });
  } catch (error) {
    console.error("Error updating email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function DELETE(req: Request, res: Response) {
  const { id } = req.body;

  try {
    const query = "DELETE FROM public.subscription WHERE id = $1";
    const values = [id];
    await pool.query(query, values);

    res.status(200).json({ message: "email deleted successfully!" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
