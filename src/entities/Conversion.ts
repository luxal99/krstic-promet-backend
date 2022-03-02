import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "./Article";
import { UnitEnum } from "../enum/UnitEnum";

@Entity("conversion", { schema: "krstic_promet" })
export class Conversion {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true })
  name: number | null;

  @Column("varchar", { name: "conversion_from_value", nullable: true })
  conversionFromValue: string | null;

  @Column({
    type: "enum",
    default: UnitEnum.METER,
    enum: UnitEnum,
  })
  conversionFromUnit: UnitEnum;

  @Column("double", {
    name: "conversion_to_value",
    nullable: true,
    precision: 22,
  })
  conversionToValue: number | null;

  @Column({
    type: "enum",
    default: UnitEnum.METER,
    enum: UnitEnum,
  })
  conversionToUnit: UnitEnum;

  @OneToMany(() => Article, (article) => article.idConversion)
  articles: Article[];
}
