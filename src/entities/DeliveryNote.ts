import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../util/generic/base.entity";
import { DeliveryNotePaidStatusEnum } from "../enum/DeliveryNotePaidStatusEnum";
import { Client } from "./Client";
import { DeliveryNoteArticle } from "./DeliveryNoteArticle";
import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";

@Entity()
export class DeliveryNote extends Base {
  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column("date", {
    name: "date_of_delivery_note",
    nullable: false,
  })
  dateOfDeliveryNote: Date | null;

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
  @ManyToOne(() => Client, (client) => client.listOfDeliveryNotes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
    nullable: true,
  })
  @JoinColumn([{ name: "id_client", referencedColumnName: "id" }])
  idClient: Client;

  @Column({ type: "double", name: "gross" })
  gross: number;

  @OneToMany(
    () => DeliveryNoteArticle,
    (deliveryNoteArticle) => deliveryNoteArticle.idDeliveryNote,
    {
      cascade: true,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  )
  listOfArticles: DeliveryNoteArticle[];
}
