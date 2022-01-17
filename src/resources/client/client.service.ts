import { Injectable } from "@nestjs/common";
import { GenericService } from "../../util/generic/generic.service";
import { Client } from "../../entities/Client";
import { ClientRepository } from "../../repository/ClientRepository";

@Injectable()
export class ClientService extends GenericService<Client> {
  constructor(genericRepository: ClientRepository) {
    super(genericRepository, ["listOfDeliveryNotes"]);
  }
}
