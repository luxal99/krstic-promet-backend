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

  @Column("int", { name: "id_article_category", nullable: true })
  idArticleCategory: number | null;

  @OneToMany(() => Article, (article) => article.idArticleSubCategory2)
  articles: Article[];

  @ManyToOne(
    () => ArticleCategory,
    (articleCategory) => articleCategory.articleSubCategories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "id_article_category", referencedColumnName: "id" }])
  idArticleCategory2: ArticleCategory;
}
