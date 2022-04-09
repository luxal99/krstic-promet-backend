import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DeliveryNote } from "./DeliveryNote";
import { Article } from "./Article";
import { DeliveryNotePaidStatusEnum } from "../enum/DeliveryNotePaidStatusEnum";
import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";

@Entity()
export class DeliveryNoteArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "selling_price" })
  sellingPrice: number;

  @Column({ name: "amount", type: "double" })
  amount: number;
  @Column({ name: "payed_amount", default: 0, type: "double" })
  payedAmount: number;

  @Column({ name: "delivered_amount", default: 0, type: "double" })
  deliveredAmount: number;

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
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "id_article", referencedColumnName: "id" }])
  idArticle: Article;

  @Column({
    type: "enum",
    default: DeliveryNotePaidStatusEnum.NOT_PAID,
    enum: DeliveryNotePaidStatusEnum,
    name: "paid_status",
  })
  public paidStatus: DeliveryNotePaidStatusEnum;
  @Column({
    type: "enum",
    default: DeliveryNoteStatusEnum.NOT_DELIVERED,
    enum: DeliveryNoteStatusEnum,
    name: "delivery_status",
  })
  public deliveryStatus: DeliveryNoteStatusEnum;
}
