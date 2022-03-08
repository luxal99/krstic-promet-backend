import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ArticleSubCategory } from "./ArticleSubCategory";
import { Warehouse } from "./Warehouse";
import { Conversion } from "./Conversion";
import { PriceTypeEnum } from "../enum/PriceTypeEnum";
import { DeliveryNoteArticle } from "./DeliveryNoteArticle";

@Index("code", ["code"], { unique: true })
@Index("id_article_sub_category", ["idArticleSubCategory"], {})
@Index("id_conversion", ["idConversion"], {})
@Index("id_warehouse", ["idWarehouse"], {})
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

  @Column({ name: "amount", type: "double" })
  amount: number;

  @Column("double", {
    name: "debit",
    precision: 22,
    default: () => "'(`purchase_price` * `amount`)'",
  })
  debit: number;

  @Column({
    type: "enum",
    default: PriceTypeEnum.PER_PIECE,
    enum: PriceTypeEnum,
    name: "price_type",
  })
  public priceType: PriceTypeEnum;

  @ManyToOne(
    () => ArticleSubCategory,
    (articleSubCategory) => articleSubCategory.articles,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_article_sub_category", referencedColumnName: "id" }])
  idArticleSubCategory: ArticleSubCategory;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.articles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_warehouse", referencedColumnName: "id" }])
  idWarehouse: Warehouse;

  @ManyToOne(() => Conversion, (conversion) => conversion.articles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_conversion", referencedColumnName: "id" }])
  idConversion: Conversion;

  @OneToMany(
    () => DeliveryNoteArticle,
    (deliveryNoteArticle) => deliveryNoteArticle.idArticle,
    {
      cascade: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  )
  listOfDeliveryNotes: DeliveryNoteArticle[];
}
