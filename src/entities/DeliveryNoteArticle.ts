import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeliveryNote } from "./DeliveryNote";
import { Article } from "./Article";

@Entity()
export class DeliveryNoteArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articlePrice: number;
  @ManyToOne(
    () => DeliveryNote,
    (deliveryNote) => deliveryNote.listOfArticles,
    {
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    }
  )
  @JoinColumn([{ name: "id_delivery_note", referencedColumnName: "id" }])
  idDeliveryNote: DeliveryNote;

  @ManyToOne(() => Article, (article) => article.listOfDeliveryNotes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_article", referencedColumnName: "id" }])
  idArticle: Article;
}
