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
        const { thumbnail, icons, name } = req.body;
        const entityId = generateEntityId("", "personalizer");
    
        // Insert the customizable product into the "customizer" table
        const result = await pool.query(
          'INSERT INTO "customizer" ("id", "thumbnail", "name") VALUES ($1, $2, $3) RETURNING id',
          [entityId, thumbnail, name]
        );
    
        const customizableProductId = result.rows[0].id;
    
        // Insert the icons into the "icons" table and associate them with the customizable product
        const iconsId = generateEntityId("", "icons");
        const iconInsertPromises = icons.map(async (iconUrl) => {
          const iconResult = await pool.query(
            'INSERT INTO "icons" ("id","customizable_product_id", "url") VALUES ($1,$2, $3) RETURNING id',
            [iconsId, customizableProductId, iconUrl]
          );
          return { id: iconResult.rows[0].id, url: iconUrl };
        });
    
        const insertedIcons = await Promise.all(iconInsertPromises);
    
        return res.status(201).json({
          message: "Customizable Product added successfully",
          id: customizableProductId, // Add this line to include the ID in the response
        });
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
}