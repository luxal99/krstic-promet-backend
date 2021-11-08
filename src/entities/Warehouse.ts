import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity("warehouse", { schema: "krstic_promet" })
export class Warehouse {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, length: 128 })
  name: string | null;

  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @OneToMany(() => Article, (article) => article.idWarehouse2)
  articles: Article[];
}
