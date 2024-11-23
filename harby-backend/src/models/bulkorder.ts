import { BaseEntity } from "@medusajs/medusa";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class bulorder extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: true })
    first_name: string;

    @Column({ nullable: true })
    last_name: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    type: string;

    @Column({ nullable: true })
    material: string;

    @Column({ nullable: true })
    color: string;

    @Column({ nullable: true })
    size: string;

    @Column({ nullable: true })
    qty: string;

    @Column({ nullable: true })
    print_technique: string;

    @Column({ nullable: true })
    desc: string;

    @Column({ nullable: true })
    address: string;

    @Column({ nullable: true })
    status: string;

    @Column({ nullable: true })
    img: string;
}
