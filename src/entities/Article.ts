import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleSubCategory } from "./ArticleSubCategory";
import { Warehouse } from "./Warehouse";
import { Conversion } from "./Conversion";

@Index("code", ["code"], { unique: true })
@Index("id_article_sub_category", ["idArticleSubCategory"], {})
@Index("id_warehouse", ["idWarehouse"], {})
@Index("id_conversion", ["idConversion"], {})
@Entity("article", { schema: "krstic_promet" })
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 64 })
  name: string;

  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column("varchar", { name: "code", unique: true, length: 64 })
  code: string;

  @Column("double", { name: "purchase_price", precision: 22 })
  purchasePrice: number;

  @Column("double", { name: "selling_price", precision: 22 })
  sellingPrice: number;

  @Column("int", { name: "amount" })
  amount: number;

  @Column("double", {
    name: "debit",
    precision: 22,
    default: () => "'(`purchase_price` * `amount`)'",
  })
  debit: number;

  @Column("int", { name: "id_article_sub_category", nullable: true })
  idArticleSubCategory: number | null;

  @Column("int", { name: "id_warehouse", nullable: true })
  idWarehouse: number | null;

  @Column("int", { name: "id_conversion", nullable: true })
  idConversion: number | null;

  @ManyToOne(
    () => ArticleSubCategory,
    (articleSubCategory) => articleSubCategory.articles,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_article_sub_category", referencedColumnName: "id" }])
  idArticleSubCategory2: ArticleSubCategory;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.articles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_warehouse", referencedColumnName: "id" }])
  idWarehouse2: Warehouse;

  @ManyToOne(() => Conversion, (conversion) => conversion.articles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_conversion", referencedColumnName: "id" }])
  idConversion2: Conversion;
}
