import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleSubCategory } from "./ArticleSubCategory";

@Entity("article_category", { schema: "krstic_promet" })
export class ArticleCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 64 })
  title: string;

  @OneToMany(
    () => ArticleSubCategory,
    (articleSubCategory) => articleSubCategory.idArticleCategory
  )
  articleSubCategories: ArticleSubCategory[];
}
