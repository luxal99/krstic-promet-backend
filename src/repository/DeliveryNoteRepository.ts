import { EntityRepository, Repository } from "typeorm";
import { DeliveryNote } from "../entities/DeliveryNote";

@EntityRepository(DeliveryNote)
export class DeliveryNoteRepository extends Repository<DeliveryNote> {}
