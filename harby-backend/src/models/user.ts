import { Column, Entity } from "typeorm";
import { User as MedusaUser } from "@medusajs/medusa";

export enum UserType {
  ADMIN = "admin",
  DESIGNER = "designer",
  FACTORY = "factory",
}

@Entity()
export default class User extends MedusaUser {
  @Column({ default: UserType.ADMIN, type: "text" })
  user_type: UserType;
}
