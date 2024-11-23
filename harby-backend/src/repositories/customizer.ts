import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { customizer } from "../models/customizer";

const customizerRepository = dataSource.getRepository(customizer);

export default customizerRepository;
