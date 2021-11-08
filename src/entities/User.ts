import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "krstic_promet" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "username", length: 64 })
  username: string;

  @Column("varchar", { name: "password", length: 64 })
  password: string;
}
