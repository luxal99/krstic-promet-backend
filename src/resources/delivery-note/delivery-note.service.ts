import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { DeliveryNote } from "../../entities/DeliveryNote";
import { DeliveryNoteRepository } from "../../repository/DeliveryNoteRepository";

@Injectable()
export class DeliveryNoteService extends GenericService<DeliveryNote> {
  constructor(private repository: DeliveryNoteRepository) {
    super(repository, []);
  }
}
