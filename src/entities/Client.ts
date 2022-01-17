import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeliveryNote } from "./DeliveryNote";

@Entity()
export class Client {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column({ type: "varchar", name: "first_name" })
  firstName: string;

  @Column({ type: "varchar", name: "last_name" })
  lastName: string;

  @Column({ type: "varchar", name: "telephone" })
  telephone: string;

  @OneToMany(() => DeliveryNote, (deliveryNote) => deliveryNote.idClient)
  listOfDeliveryNotes: DeliveryNote[];
}
