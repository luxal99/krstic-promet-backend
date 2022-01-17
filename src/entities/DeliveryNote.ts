import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from "../util/generic/base.entity";
import { DeliveryNoteStatusEnum } from "../enum/DeliveryNoteStatusEnum";
import { Client } from "./Client";
import { DeliveryNoteArticle } from "./DeliveryNoteArticle";

@Entity()
export class DeliveryNote extends Base {
  @Column("timestamp", {
    name: "created_date",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate: Date | null;

  @Column({
    type: "enum",
    default: DeliveryNoteStatusEnum.NOT_PAID,
    enum: DeliveryNoteStatusEnum,
    name: "paid_status",
  })
  public paidStatus: DeliveryNoteStatusEnum;

  @ManyToOne(() => Client, (client) => client.listOfDeliveryNotes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
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
