import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { ArticleCategory } from "./ArticleCategory";

@Index("id_article_category", ["idArticleCategory"], {})
@Entity("article_sub_category", { schema: "krstic_promet" })
export class ArticleSubCategory {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 64 })
  title: string;

  @OneToMany(() => Article, (article) => article.idArticleSubCategory)
  articles: Article[];

  @ManyToOne(
    () => ArticleCategory,
    (articleCategory) => articleCategory.articleSubCategories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_article_category", referencedColumnName: "id" }])
  idArticleCategory: ArticleCategory;
}
