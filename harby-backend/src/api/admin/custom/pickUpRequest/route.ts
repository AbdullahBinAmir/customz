import { Request, Response } from "express";
import * as pg from "pg";
import dotenv from 'dotenv';
import axios from "axios";

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
    connectionString,
    max: 100
});

const headers = {
    Authorization:
        // "0ad30dce7c79c66a6280ba8ab92c3d2a408253c10de5d772cc41bd0e77583a33",
        "29ceec1badba89799d94d17baf973262ceaee48468e40760cc39ead2ebe63694",
    "Content-Type": "application/json",
};

export async function POST(req: Request, res: Response) {
    try {
        const apiUrlBusiness = "https://stg-app.bosta.co/api/v2/pickup-locations";
        const apiResponseBusiness = await axios.get(apiUrlBusiness, { headers });
        const businessLocation = apiResponseBusiness.data.data.list[0];
    
        if (!businessLocation) {
          return res.status(404).json({ error: 'No business location found' });
        }
    
        const businessLocationId = businessLocation._id;
        const contactPersonDetails = businessLocation.contactPerson;
    
        const currentDate = new Date();
        let scheduledDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Add one day
    
        // Skip weekends
        while ([5, 6, 0].includes(scheduledDate.getDay())) {
          scheduledDate = new Date(scheduledDate.getTime() + 24 * 60 * 60 * 1000); // Add one more day
        }
    
        // Format the scheduledDate in the required format 'YYYY-MM-DD'
        const formattedScheduledDate = scheduledDate.toISOString().split('T')[0];
    
        // Pick up logic
        const apiUrlPickUp = "https://stg-app.bosta.co/api/v2/pickups";
        const requestBodyPickUp = {
          businessLocationId: businessLocationId, // LocationId needed
          scheduledDate: formattedScheduledDate,
          contactPerson: {
            name: contactPersonDetails.name,
            phone: contactPersonDetails.phone,
            email: contactPersonDetails.email,
          },
        };
    
        const apiResponsePickUp = await axios.post(apiUrlPickUp, requestBodyPickUp, {
          headers,
        });
    
        return res.status(200).json({ success: true, message: 'Pickup Request Generated' });
    
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errorCode === 1078) {
          return res.status(400).json({ success: false, message: 'Pickup request for this date already exists' });
        }
    
        console.log("Error", error);
        res.status(500).json({ success: false, error: error.message });
      }
}