import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";

@Entity("conversion", { schema: "krstic_promet" })
export class Conversion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "conversion_from_value", nullable: true })
  conversionFromValue: number | null;

  @Column("varchar", {
    name: "conversion_from_unit",
    nullable: true,
    length: 64,
  })
  conversionFromUnit: string | null;

  @Column("double", {
    name: "conversion_to_value",
    nullable: true,
    precision: 22,
  })
  conversionToValue: number | null;

  @Column("varchar", { name: "conversion_to_unit", nullable: true, length: 64 })
  conversionToUnit: string | null;

  @OneToMany(() => Article, (article) => article.idConversion)
  articles: Article[];
}
