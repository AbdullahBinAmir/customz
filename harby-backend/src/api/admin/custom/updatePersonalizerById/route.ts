import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';
import { generateEntityId } from "@medusajs/medusa";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

export async function POST(req: Request, res: Response) {
  try {
    const { id, thumbnail, icons, name } = req.body;
    console.log("body",req.body)

    // Check if 'id' is provided in the request body
    if (!id) {
      return res.status(400).json({ error: 'Missing ID in the request body' });
    }

    // Fetch the existing data to determine what needs to be updated
    const fetchDataResult = await pool.query('SELECT * FROM "customizer" WHERE "id" = $1', [id]);

    // Check if a record was found
    if (fetchDataResult.rows.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    if (thumbnail) {
      const updateData = await pool.query(  
        `
        UPDATE "customizer"
        SET "thumbnail" = $1
        WHERE "id" = $2;
        `,
        [thumbnail, id]
      );
    }
    
    if (name) {
      const updateData = await pool.query(  
        `
        UPDATE "customizer"
        SET "name" = $1
        WHERE "id" = $2;
        `,
        [name, id]
      );
    }
  let iconInsertPromises;
    if(icons){
      const deleteIconsQuery = 'DELETE FROM "icons" WHERE "customizable_product_id" = $1';
      await pool.query(deleteIconsQuery, [id]);

      const iconsId = generateEntityId("", "icons");
       iconInsertPromises = icons.map(async (iconUrl) => {
        const iconResult = await pool.query(
          'INSERT INTO "icons" ("id","customizable_product_id", "url") VALUES ($1,$2, $3) RETURNING id',
          [iconsId,id, iconUrl]
        );
        return { id: iconResult.rows[0].id, url: iconUrl };
      });
      const insertedIcons = await Promise.all(iconInsertPromises);
    }
    

    return res.status(200).json({ message: 'Customizable Product updated successfully', });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}